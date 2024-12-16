import React, { useState } from 'react';
import { Tabs, Switch, TextInput, Button } from '@mantine/core';
import { User, Building2, Webhook, Terminal } from 'lucide-react';
import './Setting.css';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="profile" leftSection={<User size={16} />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="account" leftSection={<Building2 size={16} />}>
            Account Details
          </Tabs.Tab>
          <Tabs.Tab value="api" leftSection={<Terminal size={16} />}>
            API
          </Tabs.Tab>
          <Tabs.Tab value="webhook" leftSection={<Webhook size={16} />}>
            Webhook
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-medium mb-2">Profile Status</h3>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>Profile Is Completed</span>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-medium mb-2">API Service Status</h3>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>Active</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <TextInput
                label="Company Name"
                value="Pay U Guru"
                // readOnly
              />
              
              <TextInput
                label="Email"
                value="contact@payuguru.com"
                // readOnly
                rightSection={
                  <span className="text-green-500 text-sm">Verified</span>
                }
              />
              
              <TextInput
                label="Mobile Number"
                value="+91 9876543210"
                // readOnly
                rightSection={
                  <span className="text-green-500 text-sm">Verified</span>
                }
              />
              
              <Button color="blue">
                Change Password
              </Button>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="account" className="mt-6">
          <div className="space-y-4">
            <TextInput
              label="Bank Account Number"
              value="XXXX XXXX XXXX 1234"
              // readOnly
            />
            
            <TextInput
              label="IFSC Code"
              value="HDFC0001234"
              // readOnly
            />
            
            <TextInput
              label="Bank Name"
              value="HDFC Bank"
              // readOnly
            />
            
            <TextInput
              label="Company Address"
              value="123, Business District, City - 400001"
              // readOnly
              rightSection={
                <span className="text-green-500 text-sm">Verified</span>
              }
            />
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="webhook" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <h3 className="font-medium">Payment Notifications</h3>
                <p className="text-sm text-gray-500">Receive webhooks for payment events</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <h3 className="font-medium">Settlement Notifications</h3>
                <p className="text-sm text-gray-500">Receive webhooks for settlement events</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <h3 className="font-medium">Refund Notifications</h3>
                <p className="text-sm text-gray-500">Receive webhooks for refund events</p>
              </div>
              <Switch />
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}


export default Settings;