const Organization = require("../models/OrganizationModel");
const User = require("../models/UserModel");
const Field = require("../models/FieldModel");
const Key = require("../models/KeyModel");
const bcrypt = require("bcryptjs");

//Create an Organization

const createOrganization = async (req, res) => {
  const { name, email, password, passwordVerify, plan } = req.body;

  try {
    if (!email || !password || !passwordVerify)
      return res.status(401).json({ error: "Email and Password are required" });
    if (password.length < 6)
      return res.status(401).json({ error: "Password must be Greater that 6" });
    if (password !== passwordVerify)
      return res.status(401).json({ error: "Passwords do not match" });
    const existingOrganization = await Organization.findOne({ email });
    if (existingOrganization) {
      return res
        .status(400)
        .json({ error: "An Organization with that email already exists" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newAccount = await Organization.create({
      name,
      email,
      passwordHash,
      plan,
    });
    res.status(201).json(newAccount);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrganizationById = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findById(id)
      .populate({
        path: "keys",
        populate: {
          path: "fields",
        },
      })
      .exec();
    if (!organization) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Login an Organization
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "please enter all required values" });

    const existingUser = await Organization.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ error: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ error: "Wrong email or password." });

    const token = await generateToken(existingUser._id);

    res.status(200).json({ token: token.token, user: existingUser });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
//Create a key
const createKey = async (req, res) => {
  try {
    const { account, organizationId, fields } = req.body;
    let createdFields = [];
    if (fields && fields.length > 0) {
      createdFields = await Field.create(fields);
    }
    // Create the key
    const newKey = await Key.create({
      account,
      organization: organizationId,
      fields: createdFields.map((field) => field._id),
    });

    const organization = await Organization.findById(organizationId);
    organization.keys.push(newKey);
    organization.save();
    res.status(201).json(newKey);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createKey,
  createOrganization,
  login,
  getOrganizationById,
};
//Delete a key
// Update a key
