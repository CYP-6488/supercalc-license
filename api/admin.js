const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: '只允许POST请求' 
    });
  }

  const { action, type, keys } = req.body;

  // 验证类型
  if (type !== 'single' && type !== 'full') {
    return res.status(400).json({ 
      success: false, 
      message: '类型必须是single或full' 
    });
  }

  const key = `keys:${type}`;

  try {
    // 添加授权码
    if (action === 'add') {
      if (!keys || !Array.isArray(keys)) {
        return res.status(400).json({ 
          success: false, 
          message: '需要提供keys数组' 
        });
      }
      
      await kv.rpush(key, ...keys);
      const count = await kv.llen(key);
      
      return res.status(200).json({ 
        success: true, 
        message: `成功添加${keys.length}个授权码`,
        total: count
      });
    }
    
    // 查询数量
    if (action === 'count') {
      const count = await kv.llen(key);
      return res.status(200).json({ 
        success: true, 
        count: count
      });
    }
    
    // 清空授权码
    if (action === 'clear') {
      await kv.del(key);
      return res.status(200).json({ 
        success: true, 
        message: '已清空授权码'
      });
    }
    
    return res.status(400).json({ 
      success: false, 
      message: '无效的操作' 
    });
    
  } catch (error) {
    console.error('操作失败:', error);
    return res.status(500).json({ 
      success: false, 
      message: '服务器错误' 
    });
  }
}
