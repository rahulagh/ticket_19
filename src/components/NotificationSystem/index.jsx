import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Bell, 
  Briefcase, 
  FileCheck, 
  GraduationCap, 
  X, 
  Check, 
  Filter,
  ChevronDown 
} from 'lucide-react';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
`;

const UnreadBadge = styled.span`
  background: #3498db;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Select = styled.div`
  position: relative;
  min-width: 200px;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 0.5rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #2c3e50;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    border-color: #3498db;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const MenuItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  color: #2c3e50;
  font-size: 0.875rem;

  &:hover {
    background: #f5f6fa;
  }
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NotificationCard = styled.div`
  padding: 1rem;
  background: ${props => props.isRead ? 'white' : '#f0f7ff'};
  border: 2px solid ${props => props.isRead ? '#e0e0e0' : '#3498db'};
  border-radius: 0.75rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

const NotificationContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const NotificationInfo = styled.div`
  flex: 1;
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch (props.type) {
      case 'job_alert': return '#ebf7ff';
      case 'application_status': return '#ebfbf0';
      case 'exam_notification': return '#f3ebff';
      default: return '#f5f6fa';
    }
  }};
`;

const NotificationTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 600;
`;

const NotificationMessage = styled.p`
  margin: 0 0 0.5rem 0;
  color: #616161;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const TimeStamp = styled.span`
  color: #888;
  font-size: 0.75rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  border: none;
  background: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #f5f6fa;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #888;
  font-size: 0.875rem;
`;

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job_alert',
      title: 'New Job Match',
      message: 'A new Software Developer position at Google matches your profile!',
      timestamp: '2024-10-28T10:00:00',
      read: false,
    },
    {
      id: 2,
      type: 'application_status',
      title: 'Application Updated',
      message: 'Great news! Your application for Senior Developer role has moved to the next round.',
      timestamp: '2024-10-28T09:30:00',
      read: true,
    },
    {
      id: 3,
      type: 'exam_notification',
      title: 'Upcoming Assessment',
      message: 'Reminder: You have a technical assessment scheduled for tomorrow at 2 PM.',
      timestamp: '2024-10-28T09:00:00',
      read: false,
    }
  ]);

  const [typeFilter, setTypeFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'job_alert':
        return <Briefcase size={20} color="#3498db" />;
      case 'application_status':
        return <FileCheck size={20} color="#2ecc71" />;
      case 'exam_notification':
        return <GraduationCap size={20} color="#9b59b6" />;
      default:
        return <Bell size={20} color="#7f8c8d" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    const typeMatch = typeFilter === 'all' || notif.type === typeFilter;
    const readMatch = readFilter === 'all' || 
                     (readFilter === 'read' && notif.read) ||
                     (readFilter === 'unread' && !notif.read);
    return typeMatch && readMatch;
  });

  return (
    <Container>
      <Header>
        <Title>
          <Bell size={24} color="#3498db" />
          Notifications
        </Title>
        <UnreadBadge>
          {notifications.filter(n => !n.read).length} unread
        </UnreadBadge>
      </Header>

      <FiltersContainer>
        <Select>
          <SelectButton onClick={() => setShowTypeDropdown(!showTypeDropdown)}>
            <span>Filter by type</span>
            <ChevronDown size={16} />
          </SelectButton>
          {showTypeDropdown && (
            <DropdownMenu>
              <MenuItem onClick={() => { setTypeFilter('all'); setShowTypeDropdown(false); }}>
                All Types
              </MenuItem>
              <MenuItem onClick={() => { setTypeFilter('job_alert'); setShowTypeDropdown(false); }}>
                Job Alerts
              </MenuItem>
              <MenuItem onClick={() => { setTypeFilter('application_status'); setShowTypeDropdown(false); }}>
                Application Status
              </MenuItem>
              <MenuItem onClick={() => { setTypeFilter('exam_notification'); setShowTypeDropdown(false); }}>
                Exam Notifications
              </MenuItem>
            </DropdownMenu>
          )}
        </Select>

        <Select>
          <SelectButton onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
            <span>Filter by status</span>
            <ChevronDown size={16} />
          </SelectButton>
          {showStatusDropdown && (
            <DropdownMenu>
              <MenuItem onClick={() => { setReadFilter('all'); setShowStatusDropdown(false); }}>
                All Status
              </MenuItem>
              <MenuItem onClick={() => { setReadFilter('read'); setShowStatusDropdown(false); }}>
                Read
              </MenuItem>
              <MenuItem onClick={() => { setReadFilter('unread'); setShowStatusDropdown(false); }}>
                Unread
              </MenuItem>
            </DropdownMenu>
          )}
        </Select>
      </FiltersContainer>

      <NotificationsList>
        {filteredNotifications.map((notification) => (
          <NotificationCard key={notification.id} isRead={notification.read}>
            <NotificationContent>
              <IconContainer type={notification.type}>
                {getTypeIcon(notification.type)}
              </IconContainer>
              <NotificationInfo>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
                <TimeStamp>{formatTimestamp(notification.timestamp)}</TimeStamp>
              </NotificationInfo>
              <Actions>
                {!notification.read && (
                  <ActionButton
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <Check size={18} color="#2ecc71" />
                  </ActionButton>
                )}
                <ActionButton
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  <X size={18} color="#e74c3c" />
                </ActionButton>
              </Actions>
            </NotificationContent>
          </NotificationCard>
        ))}
        
        {filteredNotifications.length === 0 && (
          <EmptyState>
            No notifications found
          </EmptyState>
        )}
      </NotificationsList>
    </Container>
  );
};

export default NotificationSystem;