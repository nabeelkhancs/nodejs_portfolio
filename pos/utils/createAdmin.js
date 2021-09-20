const User = require('../models/User');
const permissions = require('../helpers/access_levels');
const Permission = require('../models/Permission');
const Location = require('../models/Location');

module.exports = async () => {
  let allPermissions = permissions.map(x => x.code);
  console.log(allPermissions);
  const newRole = new Permission({
    name: 'Admin',
    description: 'Admin',
    permissions: allPermissions
  });
  await newRole.save();

  const newLocation = new Location({
    name: 'Default',
    address: "Default",
    locationType: "physical"
  });

  await newLocation.save();

  const newAdmin = new User({
    fullName: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    locationId: newLocation.id,
    roleId: newRole.id,
    isAdmin: true
  });
  
  await newAdmin.save();
  return;
};
