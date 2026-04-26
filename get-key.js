const https = require('https');

const SUPABASE_URL = 'https://usdsrcuoljtpwuuzawbz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9gCKQho-tZTAn-su2Fjc-Q_UZg7M9Qw';

function supabaseRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, SUPABASE_URL);
    const req = https.request(url, {
      method: options.method || 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: '只允许POST请求' 
    });
  }

  const { type, countOnly } = req.body;

  if (type !== 'single' && type !== 'full') {
    return res.status(400).json({ 
      success: false, 
      message: '类型必须是single或full' 
    });
  }

  const keyType = type === 'single' ? '2' : '3';

  try {
    // 查询未使用的激活码
    const queryResult = await supabaseRequest(
      `/rest/v1/activation_keys?type=eq.${keyType}&used=eq.false&select=*`
    );

    const keys = queryResult.data || [];
    const remaining = keys.length;

    if (countOnly) {
      return res.status(200).json({ 
        success: true, 
        remaining: remaining
      });
    }

    if (remaining === 0) {
      return res.status(200).json({ 
        success: false, 
        message: '授权码已售罄',
        remaining: 0
      });
    }

    // 随机选择一个
    const randomIndex = Math.floor(Math.random() * remaining);
    const selectedKey = keys[randomIndex];

    // 标记为已使用
    await supabaseRequest(
      `/rest/v1/activation_keys?key=eq.${encodeURIComponent(selectedKey.key)}`,
      {
        method: 'PATCH',
        body: { used: true, used_at: new Date().toISOString() }
      }
    );

    return res.status(200).json({ 
      success: true, 
      key: selectedKey.key,
      remaining: remaining - 1
    });
  } catch (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ 
      success: false, 
      message: '服务器错误: ' + error.message 
    });
  }
}
