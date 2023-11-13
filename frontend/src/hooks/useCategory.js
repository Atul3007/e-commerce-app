import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategory = () => {
    const [category, setCategory] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("https://lucky-jade-yoke.cyclic.app/api/category/all");
            setCategory(response.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return category;
}

export default useCategory;
