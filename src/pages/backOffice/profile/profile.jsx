import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import { useAuthContext } from "../../../contexts/AuthContext";
import { API } from "../../../constants/constant";
import { getToken } from "../../../helpers/helpers";
import { useToast } from "../../../hooks/useToast";

import PageHeader from "../../../components/PageHeader/PageHeader";
import LoadingBox from "../../../components/Loading/Loading";
import ProfileInformation from "./components/profileInformation";
import ProfilePicture from "./components/profilePicture";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();
  const toast = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    // Add other fields as needed
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "", // Handle null or undefined
        lastName: user.lastName || "",
        email: user.email || "",
        bio: user.bio || "",
        // Initialize other fields with user data
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      setUser(responseData);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error While Updating the Profile!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset the form data to the original user data
    setFormData({
      firstName: user.firstName || "", // Handle null or undefined
      lastName: user.lastName || "",
      email: user.email || "",
      bio: user.bio || "",
      // Reset other fields as needed
    });
  };

  if (isLoading) {
    return (
      <LoadingBox
        show={isLoading}
        message="Fetching. This may take a moment..."
      />
    );
  }

  return (
    <>
      <PageHeader title="Profile" />
      <Row>
        <Col sm={8}>
          <ProfileInformation
            user={user}
            formData={formData}
            handleProfileUpdate={handleProfileUpdate}
            handleCancel={handleCancel}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
          />
        </Col>
        <Col sm={3}>
          <ProfilePicture user={user} />
        </Col>
      </Row>
    </>
  );
}
