import React from 'react';
import { ProposalTemplate } from '../../types';

interface TemplatePreviewProps {
  template: ProposalTemplate;
  scale?: number;
}

export function TemplatePreview({ template, scale = 1 }: TemplatePreviewProps) {
  const { header, footer, sections, styling } = template;

  return (
    <div 
      className="bg-white shadow-lg rounded-lg overflow-hidden"
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        fontFamily: styling.fontFamily,
        fontSize: styling.fontSize,
      }}
    >
      {/* Header */}
      <div className="p-6 border-b" style={{ backgroundColor: styling.primaryColor + '10' }}>
        <div className="flex justify-between items-center">
          {header.logo && (
            <img src={header.logo} alt="Company Logo" className="h-16 object-contain" />
          )}
          <div className="text-right">
            <h2 className="text-2xl font-bold" style={{ color: styling.primaryColor }}>
              {header.companyName}
            </h2>
            {header.address && <p className="text-sm text-gray-600">{header.address}</p>}
            {header.phone && <p className="text-sm text-gray-600">{header.phone}</p>}
            {header.email && <p className="text-sm text-gray-600">{header.email}</p>}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="p-6 space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="space-y-2">
            {section.title && (
              <h3 
                className="text-xl font-semibold"
                style={{ color: styling.primaryColor }}
              >
                {section.title}
              </h3>
            )}
            {section.type === 'text' && section.content && (
              <div className="prose" dangerouslySetInnerHTML={{ __html: section.content }} />
            )}
            {section.type === 'products' && (
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead style={{ backgroundColor: styling.primaryColor + '10' }}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 italic">
                        Product details will appear here
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 italic">
                        0
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400 italic">
                        $0.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-gray-400 italic">
                        $0.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {section.type === 'terms' && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-400 italic">Terms and conditions will appear here</p>
              </div>
            )}
            {section.type === 'signature' && (
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Customer Signature</p>
                  <p className="text-sm text-gray-400">Date: _____________</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Representative Signature</p>
                  <p className="text-sm text-gray-400">Date: _____________</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div 
        className="p-6 border-t mt-8" 
        style={{ backgroundColor: styling.primaryColor + '10' }}
      >
        <p className="text-sm text-gray-600">{footer.text}</p>
        {footer.includeSignature && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">Authorized Signature</p>
          </div>
        )}
      </div>
    </div>
  );
}