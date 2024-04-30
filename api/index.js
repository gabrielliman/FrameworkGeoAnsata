const express = require('express');
const app = express();
const cors =require('cors');



const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
  }));
require('dotenv').config();
const db = require('./models')
const seeders = require('./seeders/20240424132404-test_data');
//Routers

const userRouter = require("./routes/Users");
app.use("/auth",userRouter) //Users
const instanceRouter = require("./routes/Instances");
app.use("/instance",instanceRouter) //Instances

const frameworkRouter = require('./routes/Frameworks');
app.use("/frameworks", frameworkRouter); //Framework
const sectionRouter = require('./routes/Sections');
app.use("/sections", sectionRouter); //Section
const subSectionRouter = require('./routes/SubSections');
app.use("/subsections", subSectionRouter); //SubSection
const requirementRouter = require('./routes/Requirements');
app.use("/requirements", requirementRouter); //Requirement
const subRequirementRouter = require('./routes/SubRequirements');
app.use("/subrequirements", subRequirementRouter); //SubRequirement

const questionRouter = require('./routes/Questions');
app.use("/questions", questionRouter); //Questions
const referenceQuestionRouter = require('./routes/ReferenceQuestions');
app.use("/referencequestions", referenceQuestionRouter); //ReferenceQuestions
const anwserRouter = require('./routes/Anwsers');
app.use("/anwsers", anwserRouter); //Anwsers




// Sync Dataset
db.sequelize.sync().then(async () => {
    // Run down methods first
    try {
        for (const seeder of seeders) {
            await seeder.down(db.sequelize.getQueryInterface(), db.Sequelize);
        }
        console.log('Seeders rolled back successfully');
    } catch (error) {
        console.error('Error rolling back seeders:', error);
    }

    // Then run up methods
    try {
        for (const seeder of seeders) {
            await seeder.up(db.sequelize.getQueryInterface(), db.Sequelize);
        }
        console.log('Seeders executed successfully');
    } catch (error) {
        console.error('Error executing seeders:', error);
    }
  
    // Start Server
    app.listen(3001, () => {
      console.log('Server is running on port 3001');
    });
  });
