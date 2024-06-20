import React from 'react'

export default function TdtCategoryList({ renderTdtCateGories, onAddNew, onTdtDelete, onTdtEdit }) {
    console.log("renderTdtCategories: ", renderTdtCateGories);
    let tdtCategoryElement = renderTdtCateGories.map((tdtCategory, index) => {
        return (
            <tr key={index}>
                <th>{index + 1}</th>
                <td>{tdtCategory.tdtId}</td>
                <td>{tdtCategory.tdtCategoryName}</td>
                <td>{tdtCategory.tdtCategoryStatus === true ? "Hien thi" : "Tam khoa"}</td>
                <td> 
                    <button className='btn btn-danger' onClick={() => tdtHandleDelete(tdtCategory.tdtId)}>Delete</button>
                </td>
                <td>
                    <button className='btn btn-success' onClick={() => tdtHandleEdit(tdtCategory)}>Edit</button>
                </td>
            </tr>
        )
    })

    
    
    const tdtHandleDelete = (tdtId) => {
        console.log("Delete:", tdtId);
        if (window.confirm('Ban co thuc su muon xoa [' + tdtId + '] ma nay?')) {
            console.log("Delete:", tdtId);
            onTdtDelete(tdtId);
        } else {
            
        }
    }
    
    const tdtHandleEdit = (tdtCategory) => {
        onTdtEdit(tdtCategory);
    }
    const tdtHandleAdd = () => {
        onAddNew(true);
    }

    return (
        <div className='container m-2'>
            <h2>Danh sach loai san pham</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ma loai</th>
                        <th>Ten loai</th>
                        <th>Trang thai</th>
                        <th>Chuc nang</th>
                    </tr>
                </thead>
                <tbody>
                    {tdtCategoryElement}
                </tbody>
            </table>
            <button className='btn btn-primary' onClick={tdtHandleAdd}>Them moi</button>
        </div>
    )
}