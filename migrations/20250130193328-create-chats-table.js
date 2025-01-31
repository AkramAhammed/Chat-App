module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("chats", {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
      sender_id: { 
        type: Sequelize.UUID, 
        allowNull: false, 
        references: { model: "users", key: "id" },
        onDelete: "CASCADE"
      },
      receiver_id: { 
        type: Sequelize.UUID, 
        allowNull: false, 
        references: { model: "users", key: "id" },
        onDelete: "CASCADE"
      },
      content: { type: Sequelize.TEXT, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") }
    });

    // ✅ Prevent self-messaging
    await queryInterface.addConstraint("chats", {
      fields: ["sender_id", "receiver_id"],
      type: "check",
      where: { sender_id: { [Sequelize.Op.ne]: Sequelize.col("receiver_id") } }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("chats");
  }
};
