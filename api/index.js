const express = require('express');
const app = express();
const cors =require('cors');;



const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
  }));
require('dotenv').config();
const db = require('./models')

//Routers
const userRouter = require("./routes/Users");
app.use("/auth",userRouter)
const instanceRouter = require("./routes/Instances");
app.use("/instance",instanceRouter)

const frameworkRouter = require('./routes/Frameworks');
app.use("/frameworks", frameworkRouter);
const sectionRouter = require('./routes/Sections');
app.use("/sections", sectionRouter);
const subSectionRouter = require('./routes/SubSections');
app.use("/subsections", subSectionRouter);
const requirementRouter = require('./routes/Requirements');
app.use("/requirements", requirementRouter);
const subRequirementRouter = require('./routes/SubRequirements');
app.use("/subrequirements", subRequirementRouter);

const questionRouter = require('./routes/Questions');
app.use("/questions", questionRouter);
const referenceQuestionRouter = require('./routes/ReferenceQuestions');
app.use("/referencequestions", referenceQuestionRouter);
const answerRouter = require('./routes/Answers');
app.use("/answers", answerRouter);


const resultRouter = require("./routes/Results");
app.use("/results",resultRouter)


// Sync Dataset
db.sequelize.sync().then(async () => {

    const upSeeder = [
        require('./seeders/frameworks_up.js'),
        require('./seeders/intro_up.js'),
        require('./seeders/secao1_up.js'),
        require('./seeders/secao2_up.js'),
        require('./seeders/secao3_up.js'),
        require('./seeders/secao4_up.js'),
        require('./seeders/secao5_up.js'),
        require('./seeders/perguntas_up.js'),
    ];
    const downSeeder = require('./seeders/test_data_down.js');

    // Run down method first
    try {
        await downSeeder.down(db.sequelize.getQueryInterface(), db.Sequelize);
        console.log('Down method executed successfully');
    } catch (error) {
        console.error('Error executing down method:', error);
    }

    // Then run up method
    try {
        for (const seeder of upSeeder) {
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
