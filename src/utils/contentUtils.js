import DOMPurify from 'dompurify';
import './index.css';

export const cleanContent = (html) => {
  if (!html) return '';

  // Clean the HTML content by removing unwanted tags and text patterns
  let cleanedHtml = html.replace(/<ol[^>]*>/g, ''); // Remove opening <ol> tags
  cleanedHtml = cleanedHtml.replace(/<\/ol>/g, ''); // Remove closing </ol> tags
  cleanedHtml = cleanedHtml.replace(/<ul[^>]*>/g, ''); // Remove opening <ul> tags
  cleanedHtml = cleanedHtml.replace(/<\/ul>/g, ''); // Remove closing </ul> tags
  cleanedHtml = cleanedHtml.replace(/<li[^>]*>/g, ''); // Remove opening <li> tags
  cleanedHtml = cleanedHtml.replace(/<\/li>/g, ''); // Remove closing </li> tags
  cleanedHtml = cleanedHtml.replace(/<p[^>]*>/g, ''); // Remove opening <p> tags
  cleanedHtml = cleanedHtml.replace(/<\/p>/g, ''); // Remove closing </p> tags
  cleanedHtml = cleanedHtml.replace(/<strong[^>]*>/g, ''); // Remove opening <strong> tags
  cleanedHtml = cleanedHtml.replace(/<\/strong>/g, ''); // Remove closing </strong> tags
  cleanedHtml = cleanedHtml.replace(/<br\s*\/?>/g, ' '); // Replace <br> tags with a space

  // Remove unwanted text patterns
  cleanedHtml = cleanedHtml.replace(/preparation\n\n/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/directions\n/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/instructions\n/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/step-1/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/method\n/g, ''); // Example of unwanted text
  cleanedHtml = cleanedHtml.replace(/how to remove/g, ''); // Example of unwanted text

  // Remove leading numbers and periods before each step
  cleanedHtml = cleanedHtml.replace(/^\d+\.\s*/gm, '');

  // Remove double quotes
  cleanedHtml = cleanedHtml.replace(/"/g, '');

  // Replace all newline characters within the text with a space
  cleanedHtml = cleanedHtml.replace(/\n/g, ' ').trim();

  // Condense multiple spaces into a single space
  cleanedHtml = cleanedHtml.replace(/\s{2,}/g, ' ');

  // Split by periods followed by space or newline and remove empty steps
  const steps = cleanedHtml.split(/\.\s+|\n/).filter(step => step.trim() !== '');

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
