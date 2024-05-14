import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Pagination.module.css';

const Pagination = () =>
{
    const [employees, setEmployees] = useState([]);
    const employeesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const lastIndex = currentPage * employeesPerPage;
    const firstIndex = lastIndex - employeesPerPage;
    const pages = Math.ceil(totalPages/10);
    
    useEffect(() =>
    {
        getEmployees();
    },[])

    useEffect(() =>
    {
        getEmployees();
    },[currentPage])

    const getEmployees = async () =>
    {
        try
        {
            const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
            const response = await axios.get(url);
            setTotalPages(response.data.length);
            setEmployees(response.data.slice(firstIndex,lastIndex))
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const handlePrev = () =>
    {
        setCurrentPage((prev) => prev === 1 ? 1 : prev-1)
    }

    const handleNext = () =>
    {
        setCurrentPage((prev) => prev === pages ? pages : prev+1)
    }

    return(
        <div className={styles.container}>
            <h1>Employee Data Table</h1>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee)=>
                    (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pages}>
                <button onClick={()=> handlePrev()}>Previous</button>
                <p>{currentPage}</p>
                <button onClick={()=> handleNext()}>Next</button>
            </div>
        </div>
    )
} 

export default Pagination