import React from "react";

const Register = () => {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                     สมัครสมาชิก
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>

                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            ชื่อ
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            นามสกุล
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            รหัสผ่าน
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            ยืนยัรหัสผ่าน
                          </label>
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                          />
                        </div>
                      </div>

                    
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                        >
                          สมัครสมาชิก
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
