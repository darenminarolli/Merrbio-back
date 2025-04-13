const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFarmerRequests = async (req, res) => {
    try {
      const { farmerId } = req.params;
  
      const requests = await Request.find()
        .populate({
          path: 'productId',
          select: 'name farmerId'
        })
        .populate({
          path: 'clientId',
          select: 'name email' // adjust based on what you want returned
        });
  
      // Filter only requests that belong to this farmer
      const farmerRequests = requests.filter(
        (r) => r.productId?.farmerId?.toString() === farmerId
      );
  
      res.json(farmerRequests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.acceptRequest = async (req, res) => {
    try {
      const { id } = req.params;
  
      const updatedRequest = await Request.findByIdAndUpdate(
        id,
        { status: 'accepted' },
        { new: true }
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.json(updatedRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };