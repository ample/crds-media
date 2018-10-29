require 'spec_helper'
require 'crds/monetate'

describe 'CRDS::Monetate' do

  it 'should upload the feed' do
    VCR.use_cassette('monetate`') do
      monetate = CRDS::Monetate.new()
      monetate.upload_the_feed!
      expect(monetate.instance_variable_get('@success')).to be_truthy
    end
  end

end
