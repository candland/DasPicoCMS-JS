class ContentsController < ApplicationController
  # GET /contents/1
  # GET /contents/1.xml
  def show
    @content = Content.find_or_create_by_name(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json  { render :json => @content }
    end
  end

  # POST /contents
  # POST /contents.xml
  def update
    @content = Content.find_or_create_by_name(params[:content].merge({:name => params[:id]}))

    puts params[:content]

    respond_to do |format|
      if @content.save
        format.html { redirect_to(@content, :notice => 'Content was successfully created.') }
        format.json  { render :json => @content, :status => :created, :location => @content }
      else
        format.html { render :action => "new" }
        format.json  { render :json => @content.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /contents/1
  # DELETE /contents/1.xml
  def destroy
    @content = Content.find(params[:id])
    @content.destroy

    respond_to do |format|
      format.html { redirect_to(contents_url) }
      format.xml  { head :ok }
    end
  end
end
