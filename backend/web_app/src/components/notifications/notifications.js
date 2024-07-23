import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Badge } from 'antd';
import { ReactComponent as Notification } from "../../assets/rawSvg/headerNavIcons/notification.svg";
export default function Notifications() {
  const [notificationList, setNotificationList] = useState([])
  const [notificationManagement, setNotificationManagement] = useState({unreadCount: 2});

  const getNotifications = () => {

  };


  useEffect(() => {
    getNotifications();
  }, []);

  const markasRead = async(notification, index) => {
    if(!notification.read){
      // const { data } = await main_api.put(companyAPIsEndPoints.UPDATE_NOTIFICATION(notification.id), {read: true});
      // if (data.isSuccess) {
        const updatedList = [...notificationList];
        const updatedItem = { ...updatedList[index] };
        updatedItem["read"] = true;
        updatedList[index] = updatedItem;
        setNotificationList(updatedList);
        setNotificationManagement({unreadCount: notificationManagement.unreadCount - 1});
      // }
    }
  }

  return (
    <>
    <div style={{width: '400px'}}>
       <NotificationHeader>
           <NotificationHeading>
           Notifications <Badge count={notificationManagement.unreadCount} color="#3669AE"></Badge>
           </NotificationHeading>
           <MarkasRead>
           Mark all as read
           </MarkasRead>
       </NotificationHeader>

       {notificationList.length > 0 ?
         <NotificatonList>
           {notificationList.map((notification,index) => (
               <NotificationItem onClick={()=>markasRead(notification, index)}>
                   <div><Notification /></div>
                   <NotificationDetail>
                     <NotificationTitle>
                       {notification.title} {!notification.read && <Badge dot={true} color="#12B76A"></Badge>}
                     </NotificationTitle>
                     <div>
                       {notification.message}
                     </div>
                   </NotificationDetail>
               </NotificationItem>
           ))}
         </NotificatonList>
         :
         <EmptyNotificatonList>
           No Notification Found
         </EmptyNotificatonList>
       }

       
   </div>

   </>  
  )
}


const MarkasRead = styled.button`
    font-weight: 500;
    font-size: 14px;
    border-radius: 8px;
    background: #3669AE;
    color: white;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`

const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  gap: 10px;
  cursor: pointer;
`

const NotificationDetail = styled.div`
  display: flex;
  flex-direction: column;
`

const NotificationTitle = styled.div`
    font-weight: 500;
    display: flex;
    justify-content: space-between;

`

const NotificationHeading = styled.div`
    font-weight: 700;
`

const NotificatonList = styled.div`
    max-height: 500px;
    overflow-y: scroll;
    padding: 0 15px;
    &::-webkit-scrollbar {
      width: 0;
    }
`

const EmptyNotificatonList = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`