'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add encrypted_key_for_user to vaults
    await queryInterface.addColumn('vaults', 'encrypted_key_for_user', {
      type: Sequelize.TEXT,
      allowNull: true, // Allow null for existing records, or force migration later
      defaultValue: null
    });

    // Add encrypted_key_for_trustee to trustee_access
    await queryInterface.addColumn('trustee_access', 'encrypted_key_for_trustee', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    // Remove recovery_key_hash from trustee_access (no longer storing passwords)
    await queryInterface.removeColumn('trustee_access', 'recovery_key_hash');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('vaults', 'encrypted_key_for_user');
    await queryInterface.removeColumn('trustee_access', 'encrypted_key_for_trustee');
    
    // Restore recovery_key_hash (nullable since we can't recover data)
    await queryInterface.addColumn('trustee_access', 'recovery_key_hash', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
