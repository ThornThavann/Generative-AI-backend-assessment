import { Response, Request } from "express";
import { Certificate } from "../entity/certificate.entity";
import { UserInfo } from "../entity/user.entity";
import { AppDataSource } from "../config";

export const createCertificate = async (req: Request, res: Response) => {
  const { UserId, courseName } = req.body;
  // we use for connect to Certificate table at database.
  const certiFicateRepository = AppDataSource.getRepository(Certificate); // we use for connect to UserInfo table at database.
  const userRepository = AppDataSource.getRepository(UserInfo); // we use for connect to Milestone table at database.

  try {
    const user = await userRepository.findOne({
      where: { id: req.params?.id },
    }); //use for find use id
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const certiFicate = new Certificate(); //use for store new data// class is blueprint (use new to create new object)

    certiFicate.user = UserId; //add user data to Certificate table
    certiFicate.courseName = courseName; //add title data to Certificate table
    await certiFicateRepository.save(certiFicate); // save data to Certificate table database

    res.status(200).json({
      id: certiFicate.id,
      UserId: user.id,
      courseName: courseName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal sever error" }); // internal server error
  }
};

export const getAllCertificate = async (req: Request, res: Response) => {
  try {
    // we use for connect to certiFicates table at database .
    const certiFicateRepository = AppDataSource.getRepository(Certificate);
    const certiFicates = await certiFicateRepository.find(); //use for find use id
    // for get data from certiFicatesRepository from certiFicates

    if (!certiFicates) {
      //if not certiFicates respone status 404 : certiFicates not found
      return res.status(404).json({ message: "certiFicates not found" });
    }
    res
      .status(200)
      .json({ message: "All certificates succesfully", data: certiFicates }); //respone data back with message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal sever error" }); // internal server error
  }
};

// Get by Id
export const getCertificatesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // we use for connect to Certificate table at database .
    const certiFicateRepository = AppDataSource.getRepository(Certificate);
    const certiFicates = await certiFicateRepository.findOne({ where: { id } });

    return res.status(200).json({
      message: "user successfully.",
      data: certiFicates,
    });
    //return response status 200 find data by id user successfully.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal sever error" }); // internal server error
  }
};

export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; //id reqest
    const certiFicateRepository = AppDataSource.getRepository(Certificate);
    // we use for connect to certiFicate table at database.
    const certiFicate = await certiFicateRepository.delete({ id });
    // delete data by id from certiFicate at database

    if (certiFicate.affected === 0) {
      /// Check if the 'affected' property in certiFicate is 0 (no data was affected)
      return res.status(404).json({ message: "Certificate not found" });
      /// If no data was affected, return a 404 status with a message "certiFicate not found"
    }
    return res
      .status(200)
      .json({ message: "Certificate successfully deleted" });
    //return response status 200 when delete data by id certiFicate successfully.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal sever error" }); // internal server error
  }
};
