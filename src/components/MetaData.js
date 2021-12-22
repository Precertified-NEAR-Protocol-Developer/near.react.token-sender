import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import { nearWalletConnection } from '../near-wallet-connection';


const MetaData = props => {
    const [metaData, changeMetaData] = useState({});

    useEffect(()=>{
        async function setData(){
            changeMetaData(await nearWalletConnection.getAccountState());
        }
        setData();
    }, []);

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Data Name</th>
                        <th>Data Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Amount</td>
                        <td>{metaData.amount}</td>
                    </tr>
                    <tr>
                        <td>Locked</td>
                        <td>{metaData.Locked}</td>
                    </tr>
                    <tr>
                        <td>Code Hash</td>
                        <td>{metaData.code_hash}</td>
                    </tr>
                    <tr>
                        <td>Storage Usage</td>
                        <td>{metaData.storage_usage}</td>
                    </tr>
                    <tr>
                        <td>Storage Paid At</td>
                        <td>{metaData.storage_paid_at}</td>
                    </tr>
                    <tr>
                        <td>Block Height</td>
                        <td>{metaData.block_height}</td>
                    </tr>
                    <tr>
                        <td>Block Hash</td>
                        <td>{metaData.block_hash}</td>
                    </tr>
                </tbody>

            </Table>
        </div>
    );
};


export default MetaData;