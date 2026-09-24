// src/houser/components/HouserWallet.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Wallet, ArrowUpRight, Building2, Smartphone, Gift, Loader2, Coins } from 'lucide-react';

export default function HouserWallet({ user, onRedemptionSuccess }) {
  const { token } = useContext(AuthContext);

  const [points, setPoints] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BankTransfer');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const availablePoints = user?.rewardPointsBalance || 0;
  const reservedPoints = user?.rewardPointsReserved || 0;
  const totalEarned = user?.totalRewardPointsEarned || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const requestedPoints = Number(points);
    if (!requestedPoints || requestedPoints <= 0) {
      setErrorMsg('Please enter a valid positive whole number of points.');
      return;
    }

    if (requestedPoints > availablePoints) {
      setErrorMsg(`Insufficient points. Your available balance is ${availablePoints} points.`);
      return;
    }

    if (paymentMethod === 'BankTransfer' && (!accountName || !accountNumber || !bankName)) {
      setErrorMsg('Account Name, Account Number, and Bank Name are required for bank transfers.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        'https://waste-management-3-iw0g.onrender.com/api/reward/redeem', // Replace with your exact route
        {
          userId: user?._id || user?.id,
          points: requestedPoints,
          paymentMethod,
          accountName: paymentMethod === 'BankTransfer' ? accountName.trim() : null,
          accountNumber: paymentMethod === 'BankTransfer' ? accountNumber.trim() : null,
          bankName: paymentMethod === 'BankTransfer' ? bankName.trim() : null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMsg(`Redemption request of ${requestedPoints} points submitted successfully!`);
      setPoints('');
      setAccountName('');
      setAccountNumber('');
      setBankName('');
      if (onRedemptionSuccess) onRedemptionSuccess(response.data);
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || err?.message || 'Failed to submit redemption request.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 my-6">
      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-forest-900 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-emerald-300 font-medium uppercase tracking-wider">
              Available Reward Balance
            </span>
            <div className="text-3xl font-bold mt-2 flex items-center gap-2">
              <Coins className="h-7 w-7 text-amber-400" />
              {availablePoints.toLocaleString()} Points
            </div>
          </div>
          <p className="text-xs text-gray-300 mt-4">
            Estimated Value: ₦{(availablePoints * 1).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Reserved / Pending Cashout
            </span>
            <div className="text-2xl font-bold text-gray-800 mt-2">
              {reservedPoints.toLocaleString()} Points
            </div>
          </div>
          <p className="text-xs text-amber-600 mt-4 font-medium">
            Currently undergoing review
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Total Lifetime Earned
            </span>
            <div className="text-2xl font-bold text-gray-800 mt-2">
              {totalEarned.toLocaleString()} Points
            </div>
          </div>
          <p className="text-xs text-emerald-600 mt-4 font-medium">
            Earned from waste & recycling
          </p>
        </div>
      </div>

      {/* Redemption Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2.5 bg-amber-50 rounded-xl">
            <Wallet className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Redeem Reward Points</h2>
            <p className="text-sm text-gray-500">Convert your points to cash or airtime</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-100">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Points Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Points to Redeem
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 500"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Payout Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'BankTransfer', label: 'Bank', icon: Building2 },
                { id: 'Airtime', label: 'Airtime', icon: Smartphone },
                { id: 'Data', label: 'Data', icon: Smartphone },
                { id: 'Voucher', label: 'Voucher', icon: Gift },
              ].map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer transition ${
                      paymentMethod === method.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {method.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bank Transfer Details */}
          {paymentMethod === 'BankTransfer' && (
            <div className="space-y-4 pt-2 border-t border-gray-100">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. GTBank, Access Bank, Kuda..."
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="10-digit account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  placeholder="Full name as on bank account"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-forest-900 text-white font-medium rounded-xl hover:bg-forest-800 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing Request...
              </>
            ) : (
              <>
                <ArrowUpRight className="h-4 w-4" /> Request Redemption
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}