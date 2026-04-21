export default function handler(req, res) {
  if (req.method === 'POST') {
    const { machineCode, licenseKey } = req.body;
    
    if (!machineCode || !licenseKey) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Missing machine code or license key' 
      });
    }
    
    const parts = licenseKey.split('-');
    if (parts.length !== 4) {
      return res.status(200).json({ 
        valid: false, 
        message: 'Invalid license key format' 
      });
    }
    
    const keyMachineCode = parts[0];
    const licenseType = parseInt(parts[1]);
    const modules = parseInt(parts[2], 16);
    
    if (keyMachineCode !== machineCode) {
      return res.status(200).json({ 
        valid: false, 
        message: 'License key does not match this machine' 
      });
    }
    
    return res.status(200).json({
      valid: true,
      licenseType: licenseType,
      modules: modules,
      message: 'License is valid'
    });
  }
  
  res.status(405).json({ message: 'Method not allowed' });
}
