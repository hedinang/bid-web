import { Col, Row } from "antd";
import "./style.scss";

export const Footer = () => {
  return (
    <Row>
      <Col sm={0} md={0} xl={5} />
      <Col sm={24} md={12} xl={7} className="left-footer">
        <div>
          Điện thoại: <span className="font-semibold">0982992628</span>
        </div>
        <div>
          Email: <span className="font-semibold">gavip13051995@gmail.com</span>
        </div>
      </Col>
      <Col sm={24} md={12} xl={7} className="right-footer">
        © 2024-2025. Toàn bộ bản quyền thuộc{" "}
        <span className="font-semibold">Stjtrading</span>
      </Col>
      <Col sm={0} md={0} xl={5} />
    </Row>
  );
};
