import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { MessageCircle, FileText, Calendar, User } from 'lucide-react';
import PatientMessageCenter from '../../components/messaging/PatientMessageCenter';
import PatientRecordsDatabase from '../../components/records/PatientRecordsDatabase';
import AppointmentManagementSystem from '../../components/appointment/AppointmentManagementSystem';
import PatientAccountManager from '../../components/account/PatientAccountManager';

const PatientCommunicationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('messages');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Patient Communication & Management
        </h1>
        
        <Tabs defaultValue="messages" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
            <TabsTrigger value="messages" className="flex items-center space-x-2 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/20 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400">
              <MessageCircle className="w-4 h-4" />
              <span>Messaging</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/20 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400">
              <FileText className="w-4 h-4" />
              <span>Medical Records</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/20 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400">
              <Calendar className="w-4 h-4" />
              <span>Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/20 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400">
              <User className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="mt-6">
            <PatientMessageCenter />
          </TabsContent>
          
          <TabsContent value="records" className="mt-6">
            <PatientRecordsDatabase />
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <AppointmentManagementSystem />
          </TabsContent>
          
          <TabsContent value="account" className="mt-6">
            <PatientAccountManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientCommunicationSystem;