import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="container">
      <div className="card mt-4">
        <div className="card-body">
          <section>
            <h1>ไม่สามารถเข้าดูเมนูนี้ได้</h1>
            <div className="flexGrow">
              <button onClick={goBack}> กลับสู่หน้าเมนูก่อนหน้า </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
