const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a helper function to calculate the status based on the values
const calculateTemperatureStatus = (values) => {
  const totalValues = values.length;
  if (totalValues === 0) {
    return "normal";
  }
  const normalValuesCount = values.filter(
    (value) => value >= 35 && value <= 37.5
  ).length;
  const normalRangePercentage = normalValuesCount / totalValues;

  if (normalRangePercentage >= 0.75) {
    return "normal";
  } else if (normalRangePercentage >= 0.5) {
    return "risky";
  } else if (normalRangePercentage >= 0.25) {
    return "critical";
  } else {
    return "critical";
  }
};
const calculateBRStatus = (values) => {
  const totalValues = values.length;
  if (totalValues === 0) {
    return "normal";
  }
  const normalValuesCount = values.filter(
    (value) => value >= 12 && value <= 18
  ).length;
  const normalRangePercentage = normalValuesCount / totalValues;

  if (normalRangePercentage >= 0.75) {
    return "normal";
  } else if (normalRangePercentage >= 0.5) {
    return "risky";
  } else if (normalRangePercentage >= 0.25) {
    return "critical";
  } else {
    return "critical";
  }
};
const calculateSPO2Status = (values) => {
  const totalValues = values.length;
  if (totalValues === 0) {
    return "normal";
  }
  const normalValuesCount = values.filter(
    (value) => value >= 95 && value <= 100
  ).length;
  const normalRangePercentage = normalValuesCount / totalValues;

  if (normalRangePercentage >= 0.75) {
    return "normal";
  } else if (normalRangePercentage >= 0.5) {
    return "risky";
  } else if (normalRangePercentage >= 0.25) {
    return "critical";
  } else {
    return "critical";
  }
};
const calculateHRStatus = (values) => {
  const totalValues = values.length;
  if (totalValues === 0) {
    return "normal";
  }
  const normalValuesCount = values.filter(
    (value) => value >= 60 && value <= 100
  ).length;
  const normalRangePercentage = normalValuesCount / totalValues;

  if (normalRangePercentage >= 0.75) {
    return "normal";
  } else if (normalRangePercentage >= 0.5) {
    return "risky";
  } else if (normalRangePercentage >= 0.25) {
    return "critical";
  } else {
    return "critical";
  }
};
const calculateHRAbnormality = (values, status) => {
  if (status === "normal") {
    return "normal";
  }
  const highCount = values.filter((value) => value > 100).length;
  const lowCount = values.filter((value) => value < 60).length;

  if (highCount > 0 && lowCount > 0) {
    return "Tachycardia and Bradycardia";
  } else if (highCount > 0 && lowCount == 0) {
    return "Tachycardia";
  } else if (lowCount > 0 && highCount == 0) {
    return "Bradycardia";
  } else {
    return "normal";
  }
};
const calculateSPO2Abnormality = (values, status) => {
  if (status === "normal") {
    return "normal";
  }
  const highCount = values.filter((value) => value > 100).length;
  const lowCount = values.filter((value) => value < 95).length;

  if (highCount > 0 && lowCount > 0) {
    return "Hypoxemia and Hyperoxemia";
  } else if (highCount > 0 && lowCount == 0) {
    return "Hyperoxemia";
  } else if (lowCount > 0 && highCount == 0) {
    return "Hypoxemia";
  } else {
    return "normal";
  }
};
const calculateBRAbnormality = (values, status) => {
  if (status === "normal") {
    return "normal";
  }
  const highCount = values.filter((value) => value > 18).length;
  const lowCount = values.filter((value) => value < 12).length;

  if (highCount > 0 && lowCount > 0) {
    return "Tachypnea and Bradypnea";
  } else if (highCount > 0 && lowCount == 0) {
    return "Tachypnea";
  } else if (lowCount > 0 && highCount == 0) {
    return "Bradypnea";
  } else {
    return "normal";
  }
};
const calculateTemperatureAbnormality = (values, status) => {
  if (status === "normal") {
    return "normal";
  }
  const highCount = values.filter((value) => value > 37.5).length;
  const lowCount = values.filter((value) => value < 35).length;

  if (highCount > 0 && lowCount > 0) {
    return "Hypothermia and Hyperthermia";
  } else if (highCount > 0 && lowCount == 0) {
    return "Hyperthermia";
  } else if (lowCount > 0 && highCount == 0) {
    return "Hypothermia";
  } else {
    return "normal";
  }
};
const calculateEndTime = (startTime, numberOfValues) => {
  // Convert the startTime to milliseconds
  const startTimeMillis = startTime.getTime();

  // Calculate the interval in milliseconds (5 seconds = 5 * 1000 milliseconds)
  const intervalMillis = 3 * 1000;

  // Calculate the total duration for all values in milliseconds
  const totalDurationMillis = intervalMillis * numberOfValues;

  // Calculate the endTime by adding the total duration to the startTime
  const endTimeMillis = startTimeMillis + totalDurationMillis;

  // Create a new Date object for the endTime
  const endTime = new Date(endTimeMillis);

  return endTime;
};
const KitRecordSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true, default: new Date() },
    Temperature: {
      values: [{ type: Number }],
      status: {
        type: String,
        enum: ["normal", "risky", "critical", "normal"],
        default: "normal",
      },
      abnormality: {
        type: String,
        enum: [
          "Hyperthermia",
          "Hypothermia",
          "Hyperthermia and Hypothermia",
          "normal",
        ],
        default: "normal",
      },
    },
    HR: {
      values: [{ type: Number }],
      status: {
        type: String,
        enum: ["normal", "risky", "critical", "normal"],
        default: "normal",
      },
      abnormality: {
        type: String,
        enum: [
          "Tachycardia",
          "Bradycardia",
          "Bradycardia and Tachycardia",
          "normal",
        ],
        default: "normal",
      },
    },
    SPO2: {
      values: [{ type: Number }],
      status: {
        type: String,
        enum: ["normal", "risky", "critical", "normal"],
        default: "normal",
      },
      abnormality: {
        type: String,
        enum: [
          "Hypoxemia",
          "Hyperoxemia",
          "Hyperoxemia and Hypoxemia",
          "normal",
        ],
        default: "normal",
      },
    },
    BR: {
      values: [{ type: Number }],
      status: {
        type: String,
        enum: ["normal", "risky", "critical", "normal"],
        default: "normal",
      },
      abnormality: {
        type: String,
        enum: ["Tachypnea", "Bradypnea", "Tachypnea and Bradypnea", "normal"],
        default: "normal",
      },
    },
    numberOfValues: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Define a pre-save hook to update the status based on the values before saving
KitRecordSchema.pre("save", function (next) {
  // Calculate status
  this.Temperature.status = calculateTemperatureStatus(this.Temperature.values);
  this.HR.status = calculateHRStatus(this.HR.values);
  this.SPO2.status = calculateSPO2Status(this.SPO2.values);
  this.BR.status = calculateBRStatus(this.BR.values);

  // Recalculate abnormality based on the updated status
  const updatedStatuses = {
    Temperature: this.Temperature.status,
    HR: this.HR.status,
    SPO2: this.SPO2.status,
    BR: this.BR.status,
  };

  // Recalculate abnormality based on updated statuses
  this.Temperature.abnormality = calculateTemperatureAbnormality(
    this.Temperature.values,
    updatedStatuses.Temperature
  );
  this.HR.abnormality = calculateHRAbnormality(
    this.HR.values,
    updatedStatuses.HR
  );
  this.SPO2.abnormality = calculateSPO2Abnormality(
    this.SPO2.values,
    updatedStatuses.SPO2
  );
  this.BR.abnormality = calculateBRAbnormality(
    this.BR.values,
    updatedStatuses.BR
  );

  // Recalculate endTime based on the updated numberOfValues
  this.endTime = calculateEndTime(this.startTime, this.numberOfValues);

  next();
});

module.exports = mongoose.model("KitRecord", KitRecordSchema);
