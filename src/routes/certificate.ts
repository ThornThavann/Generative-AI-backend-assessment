import { Router } from "express";
import { createCertificate ,getCertificatesById} from "../controllers/certificate.controller";
import protectRoute from "../middleware/auth";
import { getAllCertificate } from "../controllers/certificate.controller";
import { deleteCertificate } from "../controllers/certificate.controller";

const router = Router();

router.post("/create", createCertificate);
router.get("/All", getAllCertificate);
router.get("/:id", getCertificatesById);
router.delete("/:id", deleteCertificate);




export default router;
