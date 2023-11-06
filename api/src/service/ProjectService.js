import { projectDatabase } from "../dao/IndexDao.js"

async function getProject(req, res) {
    try {
        const projects = await projectDatabase.getProject();
        return projects;
      } catch (error) {
        throw error;
      }
}

export default {getProject}
