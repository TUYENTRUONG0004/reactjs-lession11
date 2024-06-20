import './App.css';
import TdtCategoryList from './componets/TdtCategoryList.js';
import { useEffect, useState } from 'react';
import axios from './api/TdtApi.js';
import TdtCategoryFrom from './componets/TdtCategoryForm.js';

function App() {
  const [tdtCategories, setTdtCategories] = useState([]);

  const getCategories = async () => {
    try {
      const tdtResponse = await axios.get("TdtCategory");
      setTdtCategories(tdtResponse.data);  
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const [tdtCategoryIsFrom, setTdtCategoryIsFrom] = useState(false);
  
  let tdtCategoryInit = {
    tdtId: 0,
    tdtCategoryName: "",
    tdtCategoryStatus: true
  }

  const [tdtCategoryEdit, setTdtCategoryEdit] = useState(tdtCategoryInit);

  const tdtHandleAddNew = (param) => {
    setTdtCategoryIsFrom(param);
  }

  const tdtHandleCategoryCloseForm = (param) => {
    setTdtCategoryIsFrom(param);
  }

  const tdtHandleCategorySubmit = (param) => {
    let id = tdtCategories[tdtCategories.length - 1].tdtId;
    param.tdtId = id + 1;
    tdtCategories.push(param);
    setTdtCategories((prev) => {
      return [...prev];
    });
    setTdtCategoryIsFrom(false);
  }

  const tdtHandleDelete = async (tdtId) => {
    const tdtResponse = await axios.delete(`TdtCategory/${tdtId}`);
    console.log("App-Delete-tdtId:", tdtResponse);
    let tdtDelete = tdtCategories.filter(x => x.tdtId !== tdtId);
    setTdtCategories(tdtDelete);
    console.log("Delete:", tdtDelete);
  }

  const tdtHandleEdit = (tdtCategory) => {
    setTdtCategoryEdit(tdtCategory);
    setTdtCategoryIsFrom(true);
  }

  return (
    <div className="container border my-3">
      <h1>Trương Đình Tuyển Call API</h1>
      <TdtCategoryList 
        renderTdtCateGories={tdtCategories}
        onAddNew={tdtHandleAddNew}
        onTdtDelete={tdtHandleDelete} 
        onTdtEdit={tdtHandleEdit}
      />
      <hr />
      {
        tdtCategoryIsFrom === true ? 
        <TdtCategoryFrom 
          renderTdtCateGory={tdtCategoryEdit}
          onCloseForm={tdtHandleCategoryCloseForm} 
          onCategorySubmit={tdtHandleCategorySubmit}
        /> 
        : ""
      }
      
    </div>
  );
}

export default App;