# frozen_string_literal: true

class PhotoPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    true
  end

  def show?
    true
  end

  def create?
    true
  end

  def update?
    return true if user == record.owner

    false
  end

  def destroy?
    return true if user == record.owner

    false
  end
end
