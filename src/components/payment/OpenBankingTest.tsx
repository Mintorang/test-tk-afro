'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle, Building2 } from 'lucide-react';
import { SUPPORTED_BANKS } from '@/lib/openbanking';

export function OpenBankingTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [selectedBank, setSelectedBank] = useState('barclays');

  const testOpenBankingConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      // Test TrueLayer connection
      const response = await fetch('/api/openbanking/test-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bankId: selectedBank,
          amount: 1.00, // £1 test payment
          testMode: true
        }),
      });

      const result = await response.json();
      setTestResult(result);

      if (result.success) {
        console.log('✅ Open Banking test successful:', result);
      } else {
        console.error('❌ Open Banking test failed:', result);
      }
    } catch (error) {
      console.error('❌ Open Banking test error:', error);
      setTestResult({
        success: false,
        error: 'Connection test failed',
        details: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-blue-500" />
          <span>Open Banking Test</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Bank Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Bank
          </label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {SUPPORTED_BANKS.slice(0, 5).map((bank) => (
              <option key={bank} value={bank.toLowerCase().replace(/\s+/g, '_')}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        {/* Test Button */}
        <Button
          onClick={testOpenBankingConnection}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Testing Connection...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4" />
              <span>Test Open Banking</span>
            </div>
          )}
        </Button>

        {/* Test Results */}
        {testResult && (
          <div className={`p-3 rounded-lg border ${
            testResult.success 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {testResult.success ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              <span className={`font-medium ${
                testResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {testResult.success ? 'Test Successful' : 'Test Failed'}
              </span>
            </div>
            
            {testResult.success ? (
              <div className="text-sm text-green-700 space-y-1">
                <div>✅ TrueLayer connection established</div>
                <div>✅ Bank selection working</div>
                <div>✅ Payment flow ready</div>
                {testResult.authorizationUrl && (
                  <div className="mt-2">
                    <a 
                      href={testResult.authorizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Test Payment Flow →
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-red-700">
                <div>❌ {testResult.error}</div>
                {testResult.details && (
                  <div className="mt-1 text-xs opacity-75">
                    {JSON.stringify(testResult.details, null, 2)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Configuration Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>Client ID: tkafrokitchen-36c905</div>
          <div>Environment: {process.env.NODE_ENV}</div>
          <div>Redirect URI: {process.env.TRUELAYER_REDIRECT_URI}</div>
        </div>
      </CardContent>
    </Card>
  );
} 