'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Users, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  RefreshCw
} from 'lucide-react';

interface ClientAccount {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  status: 'active' | 'pending' | 'suspended';
  merchantId?: string;
  createdAt: string;
  onboardingUrl?: string;
}

export default function SquareConnectPage() {
  const [clients, setClients] = useState<ClientAccount[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newClient, setNewClient] = useState({
    businessName: '',
    email: '',
    phone: ''
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    setClients([
      {
        id: 'tk-afro-kitchen',
        businessName: 'TK Afro Kitchen',
        email: 'chef@tkafrokitchen.com',
        phone: '07946544843',
        status: 'active',
        merchantId: 'MLB123456789',
        createdAt: '2024-01-15T10:00:00Z'
      }
    ]);
  }, []);

  const handleAddClient = async () => {
    if (!newClient.businessName || !newClient.email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const clientId = `client-${Date.now()}`;
      
      const response = await fetch('/api/square/connect/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          businessName: newClient.businessName,
          email: newClient.email,
          phone: newClient.phone
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Add new client to list
        const newClientAccount: ClientAccount = {
          id: clientId,
          businessName: newClient.businessName,
          email: newClient.email,
          phone: newClient.phone,
          status: 'pending',
          onboardingUrl: result.authorizationUrl,
          createdAt: new Date().toISOString()
        };

        setClients(prev => [...prev, newClientAccount]);
        setNewClient({ businessName: '', email: '', phone: '' });
        
        // Open onboarding URL
        window.open(result.authorizationUrl, '_blank');
      } else {
        alert('Failed to create client: ' + result.error);
      }
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Failed to add client');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><RefreshCw className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Square Connect Management</h1>
        <p className="text-gray-600">Manage your client payment accounts and onboarding</p>
      </div>

      {/* Add New Client */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Client
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name *
              </label>
              <Input
                value={newClient.businessName}
                onChange={(e) => setNewClient(prev => ({ ...prev, businessName: e.target.value }))}
                placeholder="e.g., TK Afro Kitchen"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <Input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                placeholder="chef@restaurant.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input
                value={newClient.phone}
                onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="07946544843"
              />
            </div>
          </div>
          <Button 
            onClick={handleAddClient}
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Client List */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Client Accounts</h2>
          <div className="text-sm text-gray-500">
            {clients.length} client{clients.length !== 1 ? 's' : ''}
          </div>
        </div>

        {clients.map((client) => (
          <Card key={client.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {client.businessName}
                    </h3>
                    {getStatusBadge(client.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Email:</span> {client.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {client.phone}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span> {new Date(client.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {client.merchantId && (
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Merchant ID:</span> {client.merchantId}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {client.status === 'pending' && client.onboardingUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(client.onboardingUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Complete Setup
                    </Button>
                  )}
                  
                  {client.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/admin/client/${client.id}`, '_blank')}
                    >
                      <CreditCard className="w-4 h-4 mr-1" />
                      View Payments
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {clients.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
              <p className="text-gray-500 mb-4">
                Add your first client to start processing payments through Square Connect
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 