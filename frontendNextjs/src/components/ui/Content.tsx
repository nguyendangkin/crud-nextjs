"use client";
import Card from "react-bootstrap/Card";

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Card className="text-center mt-2 mb-2">
            <Card.Body>{children}</Card.Body>
        </Card>
    );
};

export default Content;
