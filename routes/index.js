const express = require("express");
const router = express.Router();
const userModel = require("./users");
const documentModel = require("./documents");
const { upload, upload2 } = require("./multer");
const fs = require("fs");
const crypto = require("crypto");
const moment = require("moment");
const verifiedDocModel = require("./verifiedDocs");

//blockchain integration

const { Web3 } = require("web3");
// //Conect to your Ethereum node
const web3 = new Web3("http://127.0.0.1:8545");

const artifact = require("../build/contracts/Certification.json");

const { abi } = artifact;
const [key] = Object.entries(artifact.networks)[0];
// Deployed Contract Address
const { address } = artifact.networks[key];
console.log(address);

const { log, error } = require('console');

// // Load the Certification contract Instance
const contract = new web3.eth.Contract(abi, address);

console.log(contract.methods);

// GET Register and Login
router.get("/", function (req, res) {
  res.render("index", { footer: false });
});

router.get("/register", function (req, res) {
  res.render("register", { footer: false });
});

router.get("/login", function (req, res) {
  res.render("login", { footer: false });
});

// POST Register and Login

router.post("/user/register", async (req, res) => {
  // console.log(req.body)
  try {
    const Acc_address = req.body.useraddress;
    const role = req.body.role;

    const userData = new userModel({
      useraddress: Acc_address,
      username: req.body.username,
      email: req.body.email,
      Role: role,
      password: req.body.password,
    });

    let user = await userModel.findOne({
      email: userData.email
    });
    console.log(user)
  
    if(!(user === null)){
      res.status(401).send({flag: false, message: "User exists in the system"});
      return;
    }

    console.log(userData);
    // console.log();

    await contract.methods
          .createUser(
            role,
            req.body.username,
            req.body.email,
            req.body.password
          )
          .send({ from: Acc_address, gas: 8000000 });

    userModel
      .register(userData, req.body.password)
      .then(async (document) => {
        req.login(document, (err) => {
          if (err) {
            console.error("Login error:", err);
            res.status(401).send("Login failed");
           
          } else {
            if (role === "ISSUER_ROLE" || role=== 'VERIFIER_ROLE') {
              console.log(document);
              res.send({ user: document})
            } else {
              res.send({message:false})
            }
            console.log("Successfully registered");
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(400).send("Registration failed");
      });
  } catch (e) {
    res.send({message:"cant register"})
    console.log(e);
  }
});

router.post("/user/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).send("Invalid username or password");
      }
      isValidPassword(user, password)
        .then((isValid) => {
          if (isValid) {
            req.login(user, (err) => {
              if (err) {
                console.error("Login error:", err);
                res.status(401).send("Login failed");
              } else {
                documentModel.findOne({email:email}).then((x)=>{
                    console.log(x);
                    res.send({user: user})
                }).catch((err)=>{
                  console.log({Error : err.message})
                  res.status(401).send({success: false, message: "Something went wrong... while fetching documents"});
                })
              }
            });
          } else {
            res.status(401).send({ success: false, message: "The user does not exist!!"});
          }
        })
        .catch((err) => {
          console.error("Password validation error:", err);
          res.status(500).send("Internal server error");
        });
    })
    .catch((err) => {
      console.error("Authentication error:", err);
      res.status(500).send("Internal server error");
    });
});

// Profile page for User

router.get("/issuer/profile/:username", async function (req, res) {
  let issuer = await userModel.findOne({
    username: req.params.username,
  });

  documentModel
    .find({
      issuerName: req.params.username,
    })
    .then((doc) => {
      console.log(doc)
      issuer &&
        res.send({data: doc });
    })
    .catch((err) => {
      issuer && res.send({ issuer });
      console.log(err.message);
    });
});


/////////////////////////////////////////////////


router.get( "/verifier/profile/:username", async function (req, res) {
    let verifier = await userModel.findOne({
      username: req.params.username,
    });

    verifiedDocModel
      .find({
        verifierName: req.params.username,
      })
      .then((doc) => {
        console.log("hi");

        console.log(doc);
        verifier &&
          res.send({data: { verifier, doc} });
      })
      .catch((err) => {
        res.render({verifier });
        console.log(err.message);
      });
  }
);


// Blockchain function routes

router.post(
  "/issuer/generateCertificate",

  upload.single("doc"),
  async function (req, res) {
    console.log("hie")
    console.log(req.body)
    try {
      const document = new documentModel({
        issuedTo: req.body.name,
        course_name: req.body.CourseName,
        issuedBy: req.body.useraddress,
        issuerName: req.body.OrgName,
        filename: req.file.filename,
        filepath: req.file.path,
      });
      const buffer = await new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(req.file.path);
        const chunks = [];
        readStream.on("data", (chunk) => chunks.push(chunk));
        readStream.on("end", () => resolve(Buffer.concat(chunks)));
        readStream.on("error", (err) => reject(err));
      });
      const hash = crypto.createHash("sha256").update(buffer).digest("hex");
      console.log(hash);
      document.doc_Hash = hash;
      const response = await contract.methods
        .generateCertificate(
          document.doc_Hash,
          document.issuedTo,
          document.course_name
        )
        .send({ from: req.body.useraddress, gas: 8000000 });

      const { status, transactionHash } = response;
      console.log(response);
      if (status === BigInt(1)) {
        document.transactionHashId = transactionHash;

        const millisec = Date.now();
        const dateObject = moment(millisec);

        const formattedDate = dateObject.format("DD-MM-YYYY HH:mm:ss");
        document.timestamp = formattedDate;

        documentModel
          .create(document)
          .then((doc) => {
            console.log(doc);
          })
          .catch((err) => {
            console.log("error: " + err) ;
          });
      } else {
        console.log("Could not create certificate");
      }
      // res.redirect(`/issuer/profile/${req.body.OrgName}`);
      res.send({message: true});
    } catch (err) {
      console.error(err.message);
      res.send({ message: err.message});
    }
  }
);


router.post(
  "/verifier/verifyCertificate",

  upload2.single("doc"),
  async (req, res) => {
    try {
      const data = {
        verifierName: req.body.verifierName,
      };
      const buffer = await new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(req.file.path);
        const chunks = [];
        readStream.on("data", (chunk) => chunks.push(chunk));
        readStream.on("end", () => resolve(Buffer.concat(chunks)));
        readStream.on("error", (err) => reject(err));
      });
      const hash = crypto.createHash("sha256").update(buffer).digest("hex");
      data.hash = hash;
      try {
        const add = req.body.useraddress;
        console.log(add);
        const response = await contract.methods
          .getAndVerifyCertificateData(hash)
          .call({ from: add });
          console.log(response);
        const millisec = Date.now();
        const dateObject = moment(millisec);

        const formattedDate = dateObject.format("DD-MM-YYYY HH:mm:ss");
        data.uploadDate = formattedDate;

        documentModel
          .findOne({ doc_Hash: hash })
          .then((d) => {
            console.log(d.issuedTo);
            data.studentName = d.issuedTo;
            verifiedDocModel
              .create(data)
              .then((doc) => {
                console.log(doc)
                res.send({message:true,data:doc})

                console.log("Successfully verified");
              })
              .catch((err) => {
                console.log(err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (err) {
        res.status(201).send({ message: false,err });
      }
    } catch (err) {
      console.error(err);
      res.send({ message: false });
    }
  }
);

// Logout route and authentication function

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});



async function isValidPassword(user, password) {
  return user.password === password;
}

module.exports = router;
