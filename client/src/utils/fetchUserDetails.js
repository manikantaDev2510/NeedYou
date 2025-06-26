import Axios from "./Axios.js"
import SummaryApi from "../common/SummaryApi.js"

const fetchUSerDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUSerDetails