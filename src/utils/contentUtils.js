import DOMPurify from 'dompurify';

import './index.css'

export const cleanContent = (html) => {
  if (!html) return '';

  // Clean the HTML content
  let cleanedHtml = html.replace(/<ol[^>]*>/g, ''); // Remove opening <ol> tags
  cleanedHtml = cleanedHtml.replace(/<\/ol>/g, ''); // Remove closing </ol> tags
  cleanedHtml = cleanedHtml.replace(/<ul[^>]*>/g, ''); // Remove opening <ul> tags
  cleanedHtml = cleanedHtml.replace(/<\/ul>/g, ''); // Remove closing </ul> tags
  cleanedHtml = cleanedHtml.replace(/<li[^>]*>/g, ''); // Remove opening <li> tags
  cleanedHtml = cleanedHtml.replace(/<\/li>/g, '\n'); // Replace closing </li> tags with newlines
  cleanedHtml = cleanedHtml.replace(/<p[^>]*>/g, ''); // Remove opening <p> tags
  cleanedHtml = cleanedHtml.replace(/<\/p>/g, '\n'); // Replace closing </p> tags with newlines
  cleanedHtml = cleanedHtml.replace(/<strong[^>]*>/g, ''); // Remove opening <strong> tags
  cleanedHtml = cleanedHtml.replace(/<\/strong>/g, ''); // Remove closing </strong> tags
  cleanedHtml = cleanedHtml.replace(/<br\s*\/?>/g, '\n'); // Replace <br> tags with newlines

  // Remove unwanted text patterns
  cleanedHtml = cleanedHtml.replace(/prepaartion\n\n/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/directions\n/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/instructions\n/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/step-1/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/method\n/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/how to remove/g, ''); // Example of unwanted text

  // Remove leading numbers and periods before each step
  cleanedHtml = cleanedHtml.replace(/^\d+\.\s*/gm, '');

  const steps = cleanedHtml.split(/\.\s+/).filter(step => step.trim() !== ''); // Split by full stops followed by space and remove empty steps

  // Check if steps are formatted correctly
  if (steps.length === 0) return ''; // Return empty if no valid steps

  // Format steps with "Step" labels
  const formattedSteps = steps
    .map((step, index) => `<li>Step ${index + 1}: ${step.trim()}.</li>`) // Create list items with "Step" labels and add back the full stop
    .join('');

  // Wrap in <ul> tag for unordered list
  return `<ul>${formattedSteps}</ul>`;
};

export default cleanContent;
