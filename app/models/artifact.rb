class Artifact < ApplicationRecord
  has_many :user_favorites, dependent: :destroy
  has_many :users, through: :user_favorites
end
