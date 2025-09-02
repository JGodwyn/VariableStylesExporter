// This plugin will load and display Styles and Variables from the Figma file.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// Plugin size - change these values to resize the plugin
const PLUGIN_WIDTH = 320;
const PLUGIN_HEIGHT = 400;

// This shows the HTML page in "ui.html" with specified size
figma.showUI(__html__, {
  width: PLUGIN_WIDTH,
  height: PLUGIN_HEIGHT,
  themeColors: true // Enable dark/light theme support
});

// Check if we have access to the document
console.log('Plugin started');
console.log('Document access:', figma.editorType);
console.log('Current page:', figma.currentPage.name);

// Function to get all styles from the document
async function getAllStyles() {
  console.log('Getting all styles...');
  
  try {
    // Get each style type individually with error handling
    let textStyles: readonly TextStyle[] = [];
    let paintStyles: readonly PaintStyle[] = [];
    let effectStyles: readonly EffectStyle[] = [];
    let gridStyles: readonly GridStyle[] = [];
    
    try {
      textStyles = await figma.getLocalTextStylesAsync();
      console.log('Text styles loaded:', textStyles.length);
    } catch (error) {
      console.error('Error loading text styles:', error);
    }
    
    try {
      paintStyles = await figma.getLocalPaintStylesAsync();
      console.log('Paint styles loaded:', paintStyles.length);
    } catch (error) {
      console.error('Error loading paint styles:', error);
    }
    
    try {
      effectStyles = await figma.getLocalEffectStylesAsync();
      console.log('Effect styles loaded:', effectStyles.length);
    } catch (error) {
      console.error('Error loading effect styles:', error);
    }
    
    try {
      gridStyles = await figma.getLocalGridStylesAsync();
      console.log('Grid styles loaded:', gridStyles.length);
    } catch (error) {
      console.error('Error loading grid styles:', error);
    }
    
    const styles = {
      textStyles,
      paintStyles,
      effectStyles,
      gridStyles
    };
    
    console.log('Total styles retrieved:', {
      textStyles: styles.textStyles.length,
      paintStyles: styles.paintStyles.length,
      effectStyles: styles.effectStyles.length,
      gridStyles: styles.gridStyles.length
    });
    
    // Log some sample data for debugging
    if (textStyles.length > 0) {
      console.log('Sample text style:', textStyles[0]);
    }
    if (paintStyles.length > 0) {
      console.log('Sample paint style:', paintStyles[0]);
    }
    
    return styles;
  } catch (error) {
    console.error('Error getting styles:', error);
    
    // Fallback: try to get styles from current page
    console.log('Trying fallback method - getting styles from current page...');
    try {
      const pageStyles = figma.currentPage.findAll(node => 
        node.type === 'TEXT' || 
        node.type === 'RECTANGLE' || 
        node.type === 'ELLIPSE' ||
        node.type === 'POLYGON' ||
        node.type === 'STAR' ||
        node.type === 'VECTOR' ||
        node.type === 'LINE' ||
        node.type === 'FRAME' ||
        node.type === 'GROUP' ||
        node.type === 'COMPONENT' ||
        node.type === 'INSTANCE'
      );
      
      console.log('Found nodes on current page:', pageStyles.length);
      
      // Return empty styles for now, but log what we found
      return {
        textStyles: [],
        paintStyles: [],
        effectStyles: [],
        gridStyles: []
      };
    } catch (fallbackError) {
      console.error('Fallback method also failed:', fallbackError);
      throw error;
    }
  }
}

// Function to get all variables from the document
async function getAllVariables() {
  console.log('Getting all variables...');
  
  try {
    const variables = await figma.variables.getLocalVariablesAsync();
    const collections = await figma.variables.getLocalVariableCollectionsAsync();
    
    console.log('Collections found:', collections.map(c => ({ id: c.id, name: c.name })));
    console.log('Variables found:', variables.map(v => ({ 
      id: v.id, 
      name: v.name, 
      collectionId: v.variableCollectionId 
    })));
  
    // Create a map of collection IDs to collection names
    const collectionMap = new Map();
    collections.forEach(collection => {
      collectionMap.set(collection.id, collection.name);
    });
    
    // Add collection information to each variable and filter out unknown collections
    const variablesWithCollections = variables
      .map(variable => {
        const collectionName = collectionMap.get(variable.variableCollectionId);
        if (!collectionName) {
          console.log(`Warning: Variable "${variable.name}" has collection ID "${variable.variableCollectionId}" but no matching collection found - skipping`);
          return null; // Return null for variables with unknown collections
        }
        
        // Try to get the variable value by accessing the collection's modes
        let variableValue = null;
        try {
          const collection = collections.find(c => c.id === variable.variableCollectionId);
          if (collection && collection.modes.length > 0) {
            // Get the value from the first mode (usually the default mode)
            const modeId = collection.modes[0].modeId;
            variableValue = variable.valuesByMode[modeId];
          }
        } catch (error) {
          console.log(`Warning: Could not get value for variable "${variable.name}":`, error);
        }
        
        return {
          id: variable.id,
          name: variable.name,
          description: variable.description || '',
          type: variable.resolvedType,
          scopes: variable.scopes,
          collectionName: collectionName,
          value: variableValue
        };
      })
      .filter(variable => variable !== null); // Remove null entries
    
    console.log('Variables with collections:', variablesWithCollections.length);
    return variablesWithCollections;
  } catch (error) {
    console.error('Error getting variables:', error);
    throw error;
  }
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: { type: string; segment?: string }) => {
  console.log('Received message from UI:', msg);
  
  // Handle segment change requests
  if (msg.type === 'load-segment') {
    console.log('Loading segment:', msg.segment);
    
            if (msg.segment === 'styles') {
          try {
            const styles = await getAllStyles();
            console.log('Sending styles to UI:', styles);
            
            const processedStyles = {
              textStyles: styles.textStyles.map(style => ({
                id: style.id,
                name: style.name,
                description: style.description || '',
                type: 'TEXT',
                fontSize: style.fontSize,
                fontName: style.fontName,
                letterSpacing: style.letterSpacing,
                lineHeight: style.lineHeight,
                paragraphIndent: style.paragraphIndent,
                paragraphSpacing: style.paragraphSpacing,
                textCase: style.textCase,
                textDecoration: style.textDecoration
              })),
              paintStyles: styles.paintStyles.map(style => ({
                id: style.id,
                name: style.name,
                description: style.description || '',
                type: 'PAINT',
                paints: style.paints
              })),
              effectStyles: styles.effectStyles.map(style => ({
                id: style.id,
                name: style.name,
                description: style.description || '',
                type: 'EFFECT',
                effects: style.effects
              })),
              gridStyles: styles.gridStyles.map(style => ({
                id: style.id,
                name: style.name,
                description: style.description || '',
                type: 'GRID',
                layoutGrids: style.layoutGrids
              }))
            };
            
            console.log('Processed styles data:', {
              textStyles: processedStyles.textStyles.length,
              paintStyles: processedStyles.paintStyles.length,
              effectStyles: processedStyles.effectStyles.length,
              gridStyles: processedStyles.gridStyles.length
            });
            
            figma.ui.postMessage({
              type: 'styles-loaded',
              data: processedStyles
            });
      } catch (error) {
        console.error('Error loading styles:', error);
        figma.ui.postMessage({
          type: 'styles-loaded',
          data: {
            textStyles: [],
            paintStyles: [],
            effectStyles: [],
            gridStyles: []
          }
        });
      }
    } else if (msg.segment === 'variables') {
      try {
        const variables = await getAllVariables();
        console.log('Sending variables to UI:', variables);
        figma.ui.postMessage({
          type: 'variables-loaded',
          data: variables
        });
      } catch (error) {
        console.error('Error loading variables:', error);
        figma.ui.postMessage({
          type: 'variables-loaded',
          data: []
        });
      }
    }
  }

  // Handle cancel
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
