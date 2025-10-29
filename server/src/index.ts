
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import iconRouter from "./routes/icon";
import seoRouter from "./routes/seo";
import socialMediaRouter from "./routes/social-media";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(iconRouter);
app.use(seoRouter);
app.use(socialMediaRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
