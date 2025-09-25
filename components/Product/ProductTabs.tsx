import React, { useState } from "react";

interface TabContentProps {
  description: string;
  specifications: string;
  reviews: React.ReactNode;
}

const ProductTabs: React.FC<TabContentProps> = ({
  description,
  specifications,
  reviews,
}) => {
  const tabs = ["Description", "Specifications", "Reviews"];
  const [activeTab, setActiveTab] = useState("Description");
  const specArray = specifications.split(",");

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return <p className="text-gray-700">{description}</p>;
      case "Specifications":
        return (
          <div className="grid grid-cols-2 gap-4">
            {specArray.map((s, index) => (
              <p key={index} className="text-gray-700">
                {s}
              </p>
            ))}
          </div>
        );
      case "Reviews":
        return <div>{reviews}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-10">
      {/* Tabs */}
      <div className="flex justify-between items-center pb-3 space-x-6 border-b border-gray-300 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 font-medium text-lg ${
              activeTab === tab
                ? "border-b-2 border-[#A95F21] text-[#A95F21]"
                : "text-gray-500 hover:text-gray-700"
            } transition-colors duration-300`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-base">{renderContent()}</div>
    </div>
  );
};

export default ProductTabs;