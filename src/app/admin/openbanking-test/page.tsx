'use client';

import { OpenBankingTest } from '@/components/payment/OpenBankingTest';

export default function OpenBankingTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Open Banking Test</h1>
        <p className="text-gray-600">Test TrueLayer Open Banking integration</p>
      </div>

      <div className="grid gap-8">
        {/* Test Component */}
        <OpenBankingTest />

        {/* Configuration Info */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Configuration Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">TrueLayer Credentials</h3>
              <div className="space-y-1 text-gray-600">
                <div><span className="font-medium">Client ID:</span> tkafrokitchen-36c905</div>
                <div><span className="font-medium">Client Secret:</span> 4eaf2107-89fe-45b6-9fe6-487f77c6e88b</div>
                <div><span className="font-medium">Environment:</span> {process.env.NODE_ENV}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2">API Endpoints</h3>
              <div className="space-y-1 text-gray-600">
                <div><span className="font-medium">Create Payment:</span> /api/openbanking/create-payment</div>
                <div><span className="font-medium">Callback:</span> /api/openbanking/callback</div>
                <div><span className="font-medium">Test Connection:</span> /api/openbanking/test-connection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Instructions */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Test Instructions</h2>
          
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start space-x-2">
              <span className="font-medium">1.</span>
              <span>Click "Test Open Banking" to verify TrueLayer connection</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium">2.</span>
              <span>If successful, click "Test Payment Flow" to simulate a real payment</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium">3.</span>
              <span>You'll be redirected to TrueLayer's sandbox environment</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium">4.</span>
              <span>Complete the payment flow to test end-to-end integration</span>
            </div>
          </div>
        </div>

        {/* Expected Results */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-900 mb-4">Expected Results</h2>
          
          <div className="space-y-2 text-green-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>TrueLayer authentication successful</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Bank list retrieved successfully</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Payment creation working</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Callback handling functional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 