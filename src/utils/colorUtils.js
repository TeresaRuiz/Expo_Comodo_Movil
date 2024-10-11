// colorUtils.js
export const colorMapping = {
    'rojo': '#FF0000',
    'azul': '#0000FF',
    'verde': '#008000',
    'amarillo': '#FFD700',
    'negro': '#000000',
    'blanco': '#FFFFFF',
    'gris': '#808080',
    'morado': '#800080',
    'rosa': '#FFC0CB',
    'naranja': '#FFA500',
    'café': '#8B4513',
    'beige': '#F5F5DC',
    'celeste': '#87CEEB',
    'turquesa': '#40E0D0',
    'fucsia': '#FF00FF',
    'lila': '#C8A2C8',
    'lavanda': '#E6E6FA',
    'violeta': '#8A2BE2',
    'azul marino': '#000080',
    'coral': '#FF7F50',
    'oro': '#FFD700',
    'plata': '#C0C0C0',
    'bronce': '#CD7F32',
    'chocolate': '#D2691E',
    'azul cielo': '#87CEFA',
    'oliva': '#808000',
    'verde lima': '#32CD32',
    'verde esmeralda': '#50C878',
    'azul acero': '#4682B4',
    'gris claro': '#D3D3D3',
    'gris oscuro': '#A9A9A9',
    'salmón': '#FA8072',
    'amarillo limón': '#FFF44F',
    'granate': '#800000',
    'vino': '#722F37',
    'mostaza': '#FFDB58',
    'terracota': '#E2725B',
    'escarapela': '#FF6347',
    'verde pino': '#01796F',
    'azul petróleo': '#006064',
    'gris azulado': '#B0C4DE',
    'magenta': '#FF00FF',
    'zafiro': '#0F52BA',
    'cian': '#00FFFF',
    'agua': '#00FFFF',
    'menta': '#98FF98',
    'verde oliva oscuro': '#556B2F',
    'verde mar': '#2E8B57',
    'amaranto': '#E52B50',
    'albaricoque': '#FBCEB1',
    'alizarina': '#E32636',
    'almendra': '#EFDECD',
    'ámbar': '#FFBF00',
    'añil': '#4B0082',
    'arena': '#F4A460',
    'azul claro': '#ADD8E6',
    'azul real': '#4169E1',
    'berenjena': '#4B0082',
    'burdeos': '#800020',
    'carmesí': '#DC143C',
    'cerúleo': '#007BA7',
    'chartreuse': '#7FFF00',
    'caoba': '#C04000',
    'cian oscuro': '#008B8B',
    'esmeralda': '#50C878',
    'frambuesa': '#E30B5C',
    'hueso': '#F9F6EE',
    'índigo': '#4B0082',
    'jade': '#00A86B',
    'lavanda oscuro': '#734F96',
    'malva': '#E0B0FF',
    'marrón': '#964B00',
    'melón': '#F7BCB5',
    'nieve': '#FFFAFA',
    'ocre': '#CC7722',
    'perla': '#EAE0C8',
    'rojo escarlata': '#FF2400',
    'rojo tomate': '#FF6347',
    'salvia': '#9DC183',
    'verde claro': '#90EE90',
    'verde musgo': '#8A9A5B',
    'verde bosque': '#228B22',
    'verde oscuro': '#006400',
    'violeta claro': '#EE82EE',
    'verde militar': '#4B5320',
    'púrpura oscuro': '#301934',
    'azul turquesa': '#30D5C8',
    'amarillo oscuro': '#9B870C',
    'rosa fuerte': '#FF69B4',
    'malva claro': '#D8BFD8',
    'tabaco': '#71593E',
    'amarillo pastel': '#FFFF99',
    'lavanda gris': '#C4C3D0',
    'verde pasto': '#7CFC00',
    'rosa pálido': '#FFDAB9',
    'alga marina': '#9FE2BF',
    'rosa mexicano': '#E4007C',
    'rojo indio': '#CD5C5C',
    'azul pastel': '#AEC6CF',
    'verde pastel': '#77DD77',
    'rojo ladrillo': '#B22222',
    'rubí': '#E0115F',
    'siena': '#A0522D',
    'topacio': '#FFC87C',
    'verde neón': '#39FF14',
    'azul ultramar': '#120A8F',
    'verde botella': '#006A4E',
    'índigo oscuro': '#310062',
    'azul eléctrico': '#7DF9FF',
    'lavanda pálido': '#DDA0DD',
    'rosa coral': '#FF7F50',
    'verde jade': '#00A86B',
    'ocre amarillo': '#DFAF2C',
    'rojo borgoña': '#800020',
    'gris perla': '#D6D6D6',
    'amarillo dorado': '#FFD700',
    'violeta púrpura': '#9B30FF',
    'azul celeste': '#00BFFF',
    'gris plomo': '#4F4F4F',
    'azul arándano': '#8A2BE2',
    'lima eléctrico': '#CCFF00',
    'amarillo huevo': '#FCE205',
    'verde bambú': '#C7EDCC',
    'azul índigo claro': '#8A2BE2',
    'púrpura fantasía': '#9B30FF',
    'rosa té': '#FFB6C1',
    'lavanda floral': '#B57EDC'
    // Puedes seguir agregando más colores según sea necesario.
};

export const getColorValue = (colorName) => {
    const normalizedColorName = colorName.toLowerCase().trim();
    return colorMapping[normalizedColorName] || '#CCCCCC'; // Color gris por defecto
};

export const getFontColorForBackground = (backgroundColor) => {
    // Convierte el color de fondo a RGB
    let r, g, b;
    
    if (backgroundColor.startsWith('#')) {
        const hex = backgroundColor.replace('#', '');
        r = parseInt(hex.substr(0, 2), 16);
        g = parseInt(hex.substr(2, 2), 16);
        b = parseInt(hex.substr(4, 2), 16);
    } else {
        // Si por alguna razón no es un hex, usar negro
        return '#000000';
    }

    // Calcula la luminosidad
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Si el fondo es claro, usar texto negro; si es oscuro, usar texto blanco
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
