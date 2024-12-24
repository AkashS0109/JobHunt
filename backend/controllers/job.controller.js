import { Job } from "../models/job.model.js";
//admin post 
export const postJob = async (req, res) => {

    try {
        const { title, description, requirements, salary, location, jobType, experience, position, CompanyId } = req.body;
        const userId = req.id;

        //checking for all values
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !CompanyId) {
            return res.status(400).json({
                message: "Something Missing",
                success: false
            })

        }

        //when job will create it will reutn job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: CompanyId,
            created_by: userId
        });
        return res.status(200).json({
            message: "New job Created successfully",
            job,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}
export const getAllJobs = async (req, res) => {
    try {
        // const jobs = await Job.find().sort({ createdAt: -1 });
           
        
        // Get the keyword from the query or set it to an empty string if not provided
        const keyword = (req.query.keyword || "").trim();
        


        // Build the query object to search by title or description (case-insensitive)
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };


        const jobs = await Job.find(query).populate({
            path: "company",
            select: "name location" // Limit fields to avoid sensitive data
        }).sort({ createdAt: -1 });

        
        // If no jobs are found, return a 404 response
        if (!jobs.length) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }
           
        // Return the found jobs with a success status
        return res.status(200).json({
            jobs,
            success: true
        });

    
       
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};






















export const getJobById = async (req, res) => {
    const jobId = req.params.id
    const job = await Job.findById(jobId).populate({
        path: "applications"
    });
    try {
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        };
        return res.status(200).json({ jobs, success: true });
    }
    catch (error) {
        console.log(error);
    }
}


//this is for admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {

            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}