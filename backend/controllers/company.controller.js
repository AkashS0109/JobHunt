import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You Can't Register same Company",
                success: false
            })
        };

        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company Resgister Successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "CompaniesNot Found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    }

    catch (error) {
        console.log(error);
    }
}
//get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: "Company Not Found", success: false });
        }

        return res.status(200).json({ company, success: true });
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body
        const file = req.file;

        // Cloudinary

        const fileuri = getDataUri(file);
        const coludRes = await cloudinary.uploader.upload(fileuri.content)
        const logo = coludRes.secure_url;


        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company Not Found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company Infromation Updated",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


