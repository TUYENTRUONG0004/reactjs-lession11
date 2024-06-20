import React, { useEffect, useState } from 'react';
import axios from '../api/TdtApi';

export default function TdtCategoryForm({ onCloseForm, onCategorySubmit, renderTdtCategory }) {
    
    const [tdtId, setTdtId] = useState(0);
    const [tdtCategoryName, setTdtCategoryName] = useState("");
    const [tdtCategoryStatus, setTdtCategoryStatus] = useState(true);

    useEffect(() => {
        if (renderTdtCategory) {
            setTdtId(renderTdtCategory.tdtId);
            setTdtCategoryName(renderTdtCategory.tdtCategoryName);
            setTdtCategoryStatus(renderTdtCategory.tdtCategoryStatus);
        }
    }, [renderTdtCategory]); // Adding the dependency array here

    const tdtHandleClose = () => {
        onCloseForm(false);
    }

    const tdtHandleSubmit = async (event) => {
        event.preventDefault();
       
        if (tdtId === 0) {
            let tdtCategory = {
                tdtId: 0,
                tdtCategoryName: tdtCategoryName,
                tdtCategoryStatus: tdtCategoryStatus
            };
            console.log("TdtCategory", tdtCategory);
            
            await axios.post("TdtCategory", tdtCategory);
            onCategorySubmit(tdtCategory);
        } else {
            let tdtCategory = {
                tdtId: tdtId,
                tdtCategoryName: tdtCategoryName,
                tdtCategoryStatus: tdtCategoryStatus
            };
            console.log("TdtCategory", tdtCategory);
            
            await axios.put("TdtCategory", tdtCategory);
            onCategorySubmit(tdtCategory);
        }
    }

    return (
        <div>
            <form>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Category Name</span>
                    <input
                        type="text"
                        className="form-control"
                        name='tdtCategoryName'
                        value={tdtCategoryName}
                        onChange={(ev) => setTdtCategoryName(ev.target.value)}
                        placeholder="Category Name"
                        aria-label="Category Name"
                        aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon2">Category Status</span>
                    <select
                        name='tdtCategoryStatus'
                        value={tdtCategoryStatus}
                        onChange={(ev) => setTdtCategoryStatus(ev.target.value === 'true')}
                        className='form-select'
                    >
                        <option value={true}>Hien thi</option>
                        <option value={false}>Tam khoa</option>
                    </select>
                </div>
                <button className='btn btn-success' onClick={tdtHandleSubmit}>Thêm mới</button>
                <button className='btn btn-danger' onClick={tdtHandleClose}>Đóng</button>
            </form>
        </div>
    );
}