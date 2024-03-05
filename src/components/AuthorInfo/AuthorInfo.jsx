import React from "react";
import { IconCalendarDue } from '@tabler/icons-react';
import { Card } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import moment from "moment";
const AuthorInfo = ({ post }) => {
    const { t } = useTranslation();
    if (!post || !post.data || !post.data.attributes) {
        return (
            <small>Author Information Not Available</small>
        );
    }
    const { name, updatedAt } = post.data.attributes;
    const postDate = moment(updatedAt);
    const currentDate = moment();
    const timeAgo = postDate.startOf('day').fromNow();

    // Check if the post was created within the same month
    const isSameMonth = postDate.isSame(currentDate, 'month');

    return (
        <div className="d-flex col justify-content-center">
            <div className="d-flex gap-2 align-items-center">
                <IconCalendarDue size={18} /> <small>{isSameMonth ? t('thisMonth') : t('timeAgo', { time: timeAgo })}</small>
            </div>
            <div className="vr d-flex mx-2 align-self-center"></div>
            <div className="d-flex align-items-center">
                <small>{t('posted_by')} <b>{name}</b></small>
            </div>
        </div>
    );
};

export default AuthorInfo;
