import {faker} from "@faker-js/faker";

export const price = async (data) => {
        let pass = data;
        try{
            pass["price"] = faker.commerce.price(1000000, 6000000, 0, "£")
        } catch(error){
            return error;
        }
    return data
}
