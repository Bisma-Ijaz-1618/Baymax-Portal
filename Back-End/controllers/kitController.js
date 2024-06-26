const Kit = require("../model/Kit");
const KitRecord = require("../model/Record");
const PatientProfile = require("../model/Patient");
const Patient = require("../model/Patient");
const createNewAdmin = require("./authController").handleNewUser;

const generateRandomReadings = (count, min, max, decimalPlaces = 1) => {
  const readings = [];
  for (let i = 0; i < count; i++) {
    const reading = Math.random() * (max - min) + min;
    readings.push(Number(reading.toFixed(decimalPlaces)));
  }
  return readings;
};
const getRandomTimeInLastMonth = () => {
  const currentDate = new Date(); // Current date
  const lastMonth = new Date(); // Create a new date object
  lastMonth.setMonth(currentDate.getMonth() - 1); // Set the date to last month

  const randomTime = new Date(
    lastMonth.getTime() +
      Math.random() * (currentDate.getTime() - lastMonth.getTime())
  ); // Random date within last month range

  // Set random hour, minute, and second
  randomTime.setHours(Math.floor(Math.random() * 24)); // Random hour between 0 and 23
  randomTime.setMinutes(Math.floor(Math.random() * 60)); // Random minute between 0 and 59
  randomTime.setSeconds(Math.floor(Math.random() * 60)); // Random second between 0 and 59

  return randomTime;
};
const createRandomRecordsForPastMonth = async (userId) => {
  const numberOfDays = 9;
  const minRecordsPerDay = 1;
  const maxRecordsPerDay = 5;

  // Iterate over the past 30 days
  for (let i = 0; i < numberOfDays; i++) {
    // Generate a random number of records for each day
    const numRecords =
      Math.floor(Math.random() * (maxRecordsPerDay - minRecordsPerDay + 1)) +
      minRecordsPerDay;
    for (let j = 0; j < numRecords; j++) {
      // Generate random number of values for each record
      const numberOfValues = Math.floor(Math.random() * (150 - 120 + 1)) + 120;

      // Generate random sensor readings for Temperature, HR, SPO2, BR
      const temperatureValues = generateRandomReadings(
        numberOfValues,
        35,
        37.5,
        1
      );
      const hrValues = generateRandomReadings(numberOfValues, 60, 100, 0);
      const spo2Values = generateRandomReadings(numberOfValues, 95, 100, 1);
      const brValues = generateRandomReadings(numberOfValues, 12, 18, 0);

      // Create a new KitRecord instance with the generated sensor readings and userId
      const newRecord = new KitRecord({
        userId,
        startTime: getRandomTimeInLastMonth(),
        Temperature: {
          values: temperatureValues,
        },
        HR: {
          values: hrValues,
        },
        SPO2: {
          values: spo2Values,
        },
        BR: {
          values: brValues,
        },
        numberOfValues,
      });

      // Save the record to the database
      try {
        const savedRecord = await newRecord.save();
        console.log("Created new KitRecord:", savedRecord);
      } catch (error) {
        console.error("Error creating KitRecord:", error);
      }
    }
  }
};
const getRandomTime = () => {
  const randomHour = Math.floor(Math.random() * 24); // Random hour between 0 and 23
  const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
  const randomSecond = Math.floor(Math.random() * 60); // Random second between 0 and 59

  const startTime = new Date(); // Get current date
  startTime.setHours(randomHour, randomMinute, randomSecond); // Set random time

  return startTime;
};

// Function to create random records for the given userId
const createRandomRecords = async (userId) => {
  const numberOfValues = Math.floor(Math.random() * (150 - 120 + 1)) + 120;

  // Generate random sensor readings for Temperature, HR, SPO2, BR
  const temperatureValues = generateRandomReadings(numberOfValues, 33, 37, 1);
  const hrValues = generateRandomReadings(numberOfValues, 40, 100, 0);
  const spo2Values = generateRandomReadings(numberOfValues, 95, 100, 1);
  const brValues = generateRandomReadings(numberOfValues, 10, 18, 0);

  // Create a new KitRecord instance with the generated sensor readings and userId
  const newRecord = new KitRecord({
    userId,
    startTime: getRandomTime(),
    Temperature: {
      values: temperatureValues,
    },
    HR: {
      values: hrValues,
    },
    SPO2: {
      values: spo2Values,
    },
    BR: {
      values: brValues,
    },
    numberOfValues,
  });

  // Save the record to the database
  try {
    const savedRecord = await newRecord.save();
    console.log("Created new KitRecord:", savedRecord);
    return savedRecord;
  } catch (error) {
    console.error("Error creating KitRecord:", error);
  }
};

const getMyRecords = async (req, res) => {
  const userId = req.userId;
  // await KitRecord.deleteMany({
  //   userId: userId,
  // });
  //await createRandomRecordsForPastMonth(userId);

  console.log("ingetmyrecords with id", userId);
  // Find records for the given userId and with startTime within the specified date range
  KitRecord.find({
    userId: userId,
  })
    .then((records) => {
      console.log("foundrecords", records);
      return res.status(200).json(records);
    })
    .catch((err) => {
      console.error("Error retrieving records:", err);
      res.status(500).json({ error: "Internal server error here1" });
    });
};
const getPatientRecords = async (req, res) => {
  const profileId = req.params.patientId;

  //await createRandomRecordsForPastMonth(userId);

  console.log("ingetpatientrecords with profile", profileId);
  const profile = await PatientProfile.findOne({ _id: profileId });
  const userId = profile.userId;
  console.log("ingetpatientrecords with id", userId);

  // Find records for the given userId and with startTime within the specified date range
  KitRecord.find({
    userId: userId,
  })
    .then((records) => {
      console.log("foundrecords", records);
      return res.status(200).json(records);
    })
    .catch((err) => {
      console.error("Error retrieving records:", err);
      res.status(500).json({ error: "Internal server error here1" });
    });
};
const saveSensorData = async (req, res) => {
  try {
    const userId = req.body.userID;
    const hrValues = req.body?.bpm || [];
    const spo2Values = req.body?.spo2 || [];
    const temperatureValues = req.body?.temperature || [];
    const brValues = req.body?.brm || [];
    console.log("data Received", req.body);

    console.log("HR id", hrValues);
    console.log("getting records with id", userId, hrValues);
    const newRecord = new KitRecord({
      userId,
      startTime: new Date(),
      Temperature: { values: temperatureValues },
      HR: { values: hrValues },
      SPO2: { values: spo2Values },
      BR: { values: brValues },
    });
    record = await newRecord.save();
    console.log("New record created:", record);
    // let record = await KitRecord.findOne({ userId });

    // if (record) {
    //   console.log("Record found:", record);
    //   // Update the existing record
    //   record.HR.values = hrValues;
    //   record.SPO2.values = spo2Values;
    //   record.Temperature.values = temperatureValues;
    //   record.BR.values = brValues;
    //   await record.save();
    // } else {
    //   // Create a new record
    //   const newRecord = new KitRecord({
    //     userId,
    //     startTime: new Date(),
    //     Temperature: { values: temperatureValues },
    //     HR: { values: hrValues },
    //     SPO2: { values: spo2Values },
    //     BR: { values: brValues },
    //   });
    //   record = await newRecord.save();
    //   console.log("New record created:", record);
    // }

    return res.status(200);
  } catch (error) {
    console.error("Error saving sensor data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMyRecordById = async (req, res) => {
  const userId = req.userId;
  const recordId = req.params.recordId;
  console.log("ingetmyrecords with id", userId, recordId);
  // Find records for the given userId and with startTime within the specified date range
  KitRecord.find({
    userId: userId,
    _id: recordId,
  })
    .then((records) => {
      console.log("foundrecords", records);
      return res.status(200).json(records);
    })
    .catch((err) => {
      console.error("Error retrieving records:", err);
      res.status(500).json({ error: "Internal server error here1" });
    });
};
const getPatientRecordById = async (req, res) => {
  const recordId = req.params.recordId;
  console.log("ingetmyrecords with id", recordId);
  // Find records for the given userId and with startTime within the specified date range
  KitRecord.find({
    _id: recordId,
  })
    .then((records) => {
      console.log("foundrecords", records);
      return res.status(200).json(records);
    })
    .catch((err) => {
      console.error("Error retrieving records:", err);
      res.status(500).json({ error: "Internal server error here1" });
    });
};

const getKitTemp = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    // Check if a Kit with the provided UserId already exists
    const existingKit = await Kit.findOne({ userId });

    // If a Kit doesn't exist with the provided UserId, create a new one
    if (!existingKit) {
      const newKit = await Kit.create({
        userId,
        registerationDate: new Date(),
      });
      console.log("Kit created successfully:", newKit);
      return res.status(200).json(newKit);
    } else {
      console.log("Kit already exists for UserId:", userId);
      return res.status(200).json(existingKit);
    }
  } catch (error) {
    console.error("Error creating or finding Kit:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createAdminProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const newAdminProfile = new AdminProfile({
      userId,
    });

    const savedAdminProfile = await newAdminProfile.save();
    return res.status(200).json(savedAdminProfile);
  } catch (error) {
    console.error("Error creating admin profile:", error);
    return res.status(500).json({ error: "Failed to create admin profile" });
  }
};

const updateAdminProfile = async (req, res) => {
  const adminProfileId = req.params.id;
  const updateData = req.body;

  try {
    const updatedAdminProfile = await AdminProfile.findByIdAndUpdate(
      adminProfileId,
      updateData,
      { new: true }
    );

    if (updatedAdminProfile) {
      return res.status(200).json(updatedAdminProfile);
    } else {
      return res
        .status(404)
        .json({ message: `No admin profile matches ID ${adminProfileId}` });
    }
  } catch (error) {
    console.error("Error occurred while updating admin profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAdminProfile = async (req, res) => {
  const adminProfileId = req.params.id;

  try {
    const deletedAdminProfile = await AdminProfile.findByIdAndDelete(
      adminProfileId
    );

    if (deletedAdminProfile) {
      return res.status(200).json({ message: "Admin profile deleted" });
    } else {
      return res
        .status(404)
        .json({ message: `No admin profile matches ID ${adminProfileId}` });
    }
  } catch (error) {
    console.error("Error occurred while deleting admin profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getKitTemp,
  createAdminProfile,
  updateAdminProfile,
  deleteAdminProfile,
  createNewAdmin,
  getMyRecords,
  getMyRecordById,
  saveSensorData,
  getPatientRecordById,
  getPatientRecords,
};
