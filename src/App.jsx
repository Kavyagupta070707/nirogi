import React, { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign,IndianRupee, Shield, Percent, Phone, Clock, Star, Filter, ChevronDown, Info, Heart, Users, CheckCircle, AlertCircle, TrendingUp, Award, FileText } from 'lucide-react';

const MultiPageHealthTool = () => {
  const [currentPage, setCurrentPage] = useState('medicine');
  
  
  const [selectedMedication, setSelectedMedication] = useState(" ");
  const [dosage, setDosage] = useState(" ");
  

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Insurance page state
  const [age, setAge] = useState(" ");
  const [income, setIncome] = useState(" ");
  const [familySize, setFamilySize] = useState('1');
  const [healthConditions, setHealthConditions] = useState([]);
  
  const [insuranceResults, setInsuranceResults] = useState([]);
  const [insuranceLoading, setInsuranceLoading] = useState(false);

  // Mock data
  const medications = [
    'Metformin', 'Lisinopril', 'Atorvastatin', 'Amlodipine', 'Omeprazole',
    'Metoprolol', 'Losartan', 'Gabapentin', 'Hydrochlorothiazide', 'Sertraline'
  ];

  const healthConditionsList = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis',
    'Depression', 'Anxiety', 'High Cholesterol', 'Thyroid Issues'
  ];

  const mockMedicineResults = [
    {
      id: 1,
      pharmacy: 'CVS Pharmacy',
      address: '123 Main St, Anytown, ST 12345',
      phone: '(555) 123-4567',
      distance: '0.5 miles',
      rating: 4.5,
      hours: 'Open until 10 PM',
      cashPrice: 12.99,
      insurancePrice: 5.00,
      discountPrograms: [
        { name: 'GoodRx', price: 8.50, savings: '35%' },
        { name: 'CVS ExtraCare', price: 10.99, savings: '15%' }
      ],
      bestPrice: 5.00,
      priceType: 'Insurance'
    },
    {
      id: 2,
      pharmacy: 'Walgreens',
      address: '456 Oak Ave, Anytown, ST 12345',
      phone: '(555) 234-5678',
      distance: '0.8 miles',
      rating: 4.2,
      hours: 'Open until 9 PM',
      cashPrice: 15.49,
      insurancePrice: 7.50,
      discountPrograms: [
        { name: 'GoodRx', price: 9.25, savings: '40%' },
        { name: 'Walgreens Prescription Savings Club', price: 11.99, savings: '23%' }
      ],
      bestPrice: 7.50,
      priceType: 'Insurance'
    }
  ];

  const mockInsuranceResults = [
    {
      id: 1,
      provider: 'Blue Cross Blue Shield Premium',
      plan: 'Gold Plan 2025',
      monthlyPremium: 285,
      deductible: 1500,
      outOfPocketMax: 6000,
      copayPrimaryCare: 25,
      copaySpecialist: 45,
      prescriptionCoverage: 'Excellent',
      networkSize: 'Large',
      rating: 4.7,
      keyBenefits: ['No referrals needed', '24/7 telehealth', 'Prescription delivery'],
      coverageScore: 92,
      affordabilityScore: 78,
      subsidyEligible: true,
      estimatedSubsidy: 150
    },
    {
      id: 2,
      provider: 'Aetna',
      plan: 'Silver Choice Plan',
      monthlyPremium: 220,
      deductible: 2500,
      outOfPocketMax: 7500,
      copayPrimaryCare: 30,
      copaySpecialist: 60,
      prescriptionCoverage: 'Good',
      networkSize: 'Medium',
      rating: 4.3,
      keyBenefits: ['Wellness programs', 'Mental health coverage', 'HSA compatible'],
      coverageScore: 85,
      affordabilityScore: 88,
      subsidyEligible: true,
      estimatedSubsidy: 120
    },
    {
      id: 3,
      provider: 'Kaiser Permanente',
      plan: 'HMO Gold',
      monthlyPremium: 315,
      deductible: 1000,
      outOfPocketMax: 5500,
      copayPrimaryCare: 20,
      copaySpecialist: 40,
      prescriptionCoverage: 'Excellent',
      networkSize: 'Integrated',
      rating: 4.8,
      keyBenefits: ['Integrated care', 'Electronic records', 'Preventive care'],
      coverageScore: 95,
      affordabilityScore: 72,
      subsidyEligible: false,
      estimatedSubsidy: 0
    }
  ];

  const handleMedicineSearch = () => {
    if (!selectedMedication ) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(mockMedicineResults.sort((a, b) => {
        if (sortBy === 'price') return a.bestPrice - b.bestPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      }));
      setIsLoading(false);
    }, 1000);
  };

  const handleInsuranceSearch = () => {
    if (!age || !income) return;
    
    setInsuranceLoading(true);
    setTimeout(() => {
      setInsuranceResults(mockInsuranceResults.sort((a, b) => {
        return (b.coverageScore + b.affordabilityScore) - (a.coverageScore + a.affordabilityScore);
      }));
      setInsuranceLoading(false);
    }, 1200);
  };

  const toggleHealthCondition = (condition) => {
    setHealthConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const formatPrice = (price) => `₹${price.toFixed(2)}`;

  
  const Navigation = () => (
    <div className="bg-beige shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nirogi</h1>
              <p className="text-gray-600">Find the best prices and plans for your health</p>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setCurrentPage('medicine')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                currentPage === 'medicine' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Medicine Prices
            </button>
            <button
              onClick={() => setCurrentPage('insurance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                currentPage === 'insurance' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              Insurance Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  
  const MedicinePriceCard = ({ result }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{result.pharmacy}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{result.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
             
            </div>
            <div className="flex items-center gap-1">
             
            </div>
          </div>
         
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{formatPrice(result.bestPrice)}</div>
          <div className="text-sm text-gray-500">Best Price</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-gray-700 mb-1">Cash Price</div>
          <div className="text-lg font-semibold">{formatPrice(result.cashPrice)}</div>
        </div>
       
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-purple-700 mb-1">Best Discount</div>
          <div className="text-lg font-semibold text-purple-600">
            {formatPrice(Math.min(...result.discountPrograms.map(p => p.price)))}
          </div>
        </div>
      </div>
    </div>
  );

  
  const InsurancePlanCard = ({ plan }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{plan.provider}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{plan.rating}</span>
            </div>
            {plan.subsidyEligible && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Subsidy Eligible
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-3">{plan.plan}</p>
          
          
        </div>
        
        
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-gray-900">{formatPrice(plan.deductible)}</div>
          <div className="text-xs text-gray-600">Deductible</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-gray-900">{formatPrice(plan.outOfPocketMax)}</div>
          <div className="text-xs text-gray-600">Out-of-Pocket Max</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-gray-900">{formatPrice(plan.copayPrimaryCare)}</div>
          <div className="text-xs text-gray-600">Primary Care</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-gray-900">{formatPrice(plan.copaySpecialist)}</div>
          <div className="text-xs text-gray-600">Specialist</div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">Coverage Score</div>
            <div className="text-lg font-bold text-blue-600">{plan.coverageScore}/100</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700">Affordability</div>
            <div className="text-lg font-bold text-green-600">{plan.affordabilityScore}/100</div>
          </div>
        </div>
        
       
      </div>
    </div>
  );

  // Medicine Page Component
  const MedicinePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Compare Medicine Prices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medication Name</label>
              <select
                value={selectedMedication}
                onChange={(e) => setSelectedMedication(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select medication...</option>
                {medications.map(med => (
                  <option key={med} value={med}>{med}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g., 500mg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            

            
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleMedicineSearch}
              disabled={!selectedMedication|| isLoading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Search className="w-5 h-5" />
              {isLoading ? 'Searching...' : 'Compare Prices'}
            </button>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Price Comparison Results</h3>
            <div className="space-y-4">
              {searchResults.map(result => (
                <MedicinePriceCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  
  const InsurancePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find the Best Insurance Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g., 50000"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Family Size</label>
              <select
                value={familySize}
                onChange={(e) => setFamilySize(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">Just me</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5+">5+ people</option>
              </select>
            </div>

            
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Health Conditions (Select all that apply)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {healthConditionsList.map(condition => (
                <button
                  key={condition}
                  onClick={() => toggleHealthCondition(condition)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    healthConditions.includes(condition)
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleInsuranceSearch}
              disabled={!age || !income  || insuranceLoading}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Shield className="w-5 h-5" />
              {insuranceLoading ? 'Searching Plans...' : 'Find Insurance Plans'}
            </button>
          </div>
        </div>

        {insuranceResults.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recommended Insurance Plans</h3>
              
            </div>
            
            <div className="space-y-4">
              {insuranceResults.map(plan => (
                <InsurancePlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-blue-600" />
                <h4 className="text-lg font-semibold text-gray-900">Important Information</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
               
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Navigation />
      {currentPage === 'medicine' ? <MedicinePage /> : <InsurancePage />}
    </div>
  );
};

export default MultiPageHealthTool;